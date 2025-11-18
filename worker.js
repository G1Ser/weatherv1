/**
 * @description 以高德开发者平台为例
 * @example API_KEY-创建Web服务创建一个key
 * @example API_BASE_URL-https://restapi.amap.com/v3
 */
const API_BASE_URL = 'https://restapi.amap.com/v3';
/**
 * @description 接口映射
 */
const API_MAP = {
  '/ip': handleIPQuery,
  '/geocode/geo': handleGeocodeQuery,
  '/weather/weatherInfo': handleWeatherQuery,
};
/**
 * @description 允许的白名单
 */
const ALLOWED_ORIGINS = [
  'http://localhost:3000', // 本地开发环境
  'https://weather.chauncey.work', // 线上生产环境
];
/**
 * @description 缓存时间配置
 */
// 时间单位常量
const MINUTE = 60;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const CACHE_TTL = {
  IP: {
    kv: 24 * HOUR,
    browser: 1 * HOUR,
  },
  GEOCODE: {
    kv: 30 * DAY,
    browser: 1 * DAY,
  },
  WEATHER: {
    kv: 60 * MINUTE,
    browser: 30 * MINUTE,
  },
};

// 提取公共的 CORS 头生成函数
const getCORSHeaders = origin => {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
};

// 验证来源是否在白名单中
const isAllowedOrigin = origin => {
  return ALLOWED_ORIGINS.includes(origin);
};

// 封装CORS请求
const handleCORS = origin => {
  return new Response(null, {
    status: 204,
    headers: {
      ...getCORSHeaders(origin),
    },
  });
};

/**
 * @description 主处理函数
 */
export default {
  async fetch(request, env) {
    // 检查必需的环境变量
    if (!env.AMAP_KEY) {
      return new Response(JSON.stringify({ error: 'Configuration Error', message: 'AMAP_KEY is not configured' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    const url = new URL(request.url);
    const origin = request.headers.get('Origin');
    if (!isAllowedOrigin(origin)) {
      return new Response(JSON.stringify({ error: 'Forbidden', message: 'Origin not allowed' }), {
        status: 403,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    if (request.method === 'OPTIONS') {
      return handleCORS(origin);
    }
    // 获取路由处理函数
    const handler = API_MAP[url.pathname];
    if (!handler) {
      return new Response(JSON.stringify({ error: 'Not found', message: 'Route not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    try {
      return await handler(request, env, origin);
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Internal Server Error', message: error.message || 'An unexpected error occurred' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...getCORSHeaders(origin),
        },
      });
    }
  },
};

/**
 * @description IP定位处理函数
 * @param {Request} request - 请求对象
 * @param {Object} env - 环境对象
 * @param {string} origin - 来源
 * @returns {Promise<Response>} - 响应对象
 */
async function handleIPQuery(request, env, origin) {
  // 获取用户IP
  const IP = request.headers.get('CF-Connecting-IP');
  const cacheKey = `ip:${IP}`;
  // 检查缓存
  const cachedResponse = await env.CACHE.get(cacheKey);
  if (cachedResponse) {
    return new Response(cachedResponse, {
      headers: {
        'Content-Type': 'application/json',
        ...getCORSHeaders(origin),
        'X-Cache': 'HIT',
        'Cache-Control': `public, max-age=${CACHE_TTL.IP.browser}`,
      },
    });
  }
  // 若没有缓存，调用高德API
  const response = await fetch(`${API_BASE_URL}/ip?ip=${IP}&key=${env.AMAP_KEY}`);
  const data = await response.text();
  // 存储进缓存
  await env.CACHE.put(cacheKey, data, {
    expirationTtl: CACHE_TTL.IP.kv,
  });
  return new Response(data, {
    headers: {
      'Content-Type': 'application/json',
      ...getCORSHeaders(origin),
      'X-Cache': 'MISS',
      'Cache-Control': `public, max-age=${CACHE_TTL.IP.browser}`,
    },
  });
}

/**
 * @description 地理编码处理函数
 * @param {Request} request - 请求对象
 * @param {Object} env - 环境对象
 * @param {string} origin - 来源
 * @returns {Promise<Response>} - 响应对象
 */
async function handleGeocodeQuery(request, env, origin) {
  const url = new URL(request.url);
  const address = url.searchParams.get('address');
  if (!address) {
    return new Response(JSON.stringify({ error: 'Bad Request', message: 'Address is required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        ...getCORSHeaders(origin),
      },
    });
  }
  const cacheKey = `geocode:${address}`;
  const cachedResponse = await env.CACHE.get(cacheKey);
  if (cachedResponse) {
    return new Response(cachedResponse, {
      headers: {
        'Content-Type': 'application/json',
        ...getCORSHeaders(origin),
        'X-Cache': 'HIT',
        'Cache-Control': `public, max-age=${CACHE_TTL.GEOCODE.browser}`,
      },
    });
  }
  const response = await fetch(`${API_BASE_URL}/geocode/geo?address=${encodeURIComponent(address)}&key=${env.AMAP_KEY}`);
  const data = await response.text();
  await env.CACHE.put(cacheKey, data, {
    expirationTtl: CACHE_TTL.GEOCODE.kv,
  });
  return new Response(data, {
    headers: {
      'Content-Type': 'application/json',
      ...getCORSHeaders(origin),
      'X-Cache': 'MISS',
      'Cache-Control': `public, max-age=${CACHE_TTL.GEOCODE.browser}`,
    },
  });
}

/**
 * @description 天气查询处理函数
 * @param {Request} request - 请求对象
 * @param {Object} env - 环境对象
 * @param {string} origin - 来源
 * @returns {Promise<Response>} - 响应对象
 */
async function handleWeatherQuery(request, env, origin) {
  const url = new URL(request.url);
  const adcode = url.searchParams.get('adcode');
  const extensions = url.searchParams.get('extensions') || 'base';
  if (!adcode) {
    return new Response(JSON.stringify({ error: 'Bad Request', message: 'Adcode is required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        ...getCORSHeaders(origin),
      },
    });
  }
  const cacheKey = `weather:${adcode}:${extensions}`;
  const cachedResponse = await env.CACHE.get(cacheKey);
  if (cachedResponse) {
    return new Response(cachedResponse, {
      headers: {
        'Content-Type': 'application/json',
        ...getCORSHeaders(origin),
        'X-Cache': 'HIT',
        'Cache-Control': `public, max-age=${CACHE_TTL.WEATHER.browser}`,
      },
    });
  }
  const response = await fetch(`${API_BASE_URL}/weather/weatherInfo?adcode=${adcode}&extensions=${extensions}&key=${env.AMAP_KEY}`);
  const data = await response.text();
  await env.CACHE.put(cacheKey, data, {
    expirationTtl: CACHE_TTL.WEATHER.kv,
  });
  return new Response(data, {
    headers: {
      'Content-Type': 'application/json',
      ...getCORSHeaders(origin),
      'X-Cache': 'MISS',
      'Cache-Control': `public, max-age=${CACHE_TTL.WEATHER.browser}`,
    },
  });
}

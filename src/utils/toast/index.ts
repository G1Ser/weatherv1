import Vue from 'vue';
import ToastComponent from './toast';
import './toast.scss';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

let toastInstance: Vue | null = null;

const createToast = (options: ToastProps) => {
  if (toastInstance) {
    toastInstance.$destroy();
    if (toastInstance.$el && toastInstance.$el.parentNode) {
      toastInstance.$el.parentNode.removeChild(toastInstance.$el);
    }
  }

  toastInstance = new ToastComponent({
    propsData: {
      message: options.message,
      type: options.type,
      duration: options.duration || 2000,
    },
  });

  const container = document.createElement('div');
  document.body.appendChild(container);
  toastInstance.$mount(container);
};

const Toast = {
  success(message: string, duration = 2000) {
    createToast({ message, type: 'success', duration });
  },
  info(message: string, duration = 2000) {
    createToast({ message, type: 'info', duration });
  },
  error(message: string, duration = 2000) {
    createToast({ message, type: 'error', duration });
  },
};

export default Toast;

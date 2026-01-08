import Vue from 'vue';
import SvgIcon from '@/components/SvgIcon.vue';

const ToastComponent = Vue.extend({
  name: 'Toast',

  components: {
    SvgIcon,
  },

  props: {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String as () => 'success' | 'error',
      required: true,
    },
    duration: {
      type: Number,
      default: 2000,
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.visible = true;
    });
    setTimeout(() => {
      this.close();
    }, this.duration);
  },

  methods: {
    close() {
      this.visible = false;
      setTimeout(() => {
        this.$destroy();
        if (this.$el && this.$el.parentNode) {
          this.$el.parentNode.removeChild(this.$el);
        }
      }, 300);
    },
  },

  render() {
    return (
      <transition name="toast">
        {this.visible && (
          <div class={`toast-container toast-container--${this.type}`}>
            <SvgIcon name={this.type} size="20px" />
            <span class="toast-message">{this.message}</span>
          </div>
        )}
      </transition>
    );
  },
});

export default ToastComponent;

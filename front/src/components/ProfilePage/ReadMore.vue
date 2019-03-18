<template>
  <div class="read-more-wrap">
    <span>{{textShow}}</span>
    <button v-if="more" class="more" @click="collapse=true">Learn more</button>
    <button v-if="less" class="less" @click="collapse=false">Read less</button>
  </div>
</template>

<script>
    export default {
      props: ['text', 'maxChars'],
      data: function () {
        return {
          more: false,
          less: false,
          collapse: false,
          msg: this.text,
          msgLength: this.maxChars,
        }
      },
      computed: {
        textShow: function () {
          if ( this.msg.length < this.msgLength ) {
            this.more = false;
            this.less = false;
            return this.msg;
          }
          if (this.msg.length > this.msgLength) {
            if (!this.collapse) {
              this.more = true;
              this.less = false
              return this.msg.slice(0, this.msgLength);
            } else {
              this.more = false;
              this.less = true;
              return this.msg;
            }
          }
        }
      },
    }

</script>

<style scoped lang="scss">
  .read-more-wrap {

    span {
      font-size: 14px;
      font-weight: 400;
      color: #333;
    }

    .more, .less {
      padding: 0;
      border: none;
      background: none;
      font-size: 12px;
      color: #69C8FE;
      outline: none;
    }
  }

</style>

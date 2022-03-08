// postcss.config.js
module.exports = {
  plugins: {
    // todo 行内样式不会转换
    'postcss-pxtorem': {
      // 基准值
      // 通常是设计稿除以10
      // vant 是基于375的设计稿进行编写的
      // todo 官网的实例也无效
      rootValue({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 37.5;
      },

      // 需要转换的css属性，如width、font-size等
      //  * 表示全部转换
      propList: ['*'],
    },
  },
};

module.exports = {
    plugins: {
        autoprefixer: { browsers: 'last 5 version' },
    },
    plugins: [
        require('postcss-pxtorem')({
            rootValue: 192.0, //类似px2rem中的remUnit参数
            unitPrecision: 20, //  转换成rem后保留的小数点位数
            propList: ['*'], //转换哪些px
            selectorBlackList: [], // 有关px的样式将不被转换，这里也支持正则写法
            replace: true,
            mediaQuery: false,
            minPixelValue: 0, // 所有小于2px的样式都不被转换
            //   exclude: /antd/i // 排除antd 里面rem 转换
        }),
        require('autoprefixer')(), // 自动补全 moz ms webkit
    ],
};

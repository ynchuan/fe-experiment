fis.match('**.less', {
    rExt: 'css',
    parser: fis.plugin('less'),
    postprocessor: fis.plugin('less-autoprefix', {
        browsers: ['last 20 versions']
    })
});
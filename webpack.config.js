const path = require("path");
module.exports = {
    entry: "index.js",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets:["@babel/preset-env","@babel/preset-react" ]
                }
            }
        ]
    },
    devServer:{
        contentBase: path.join(__dirname, 'public')
    }
};

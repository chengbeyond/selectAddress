module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "parser": "babel-eslint",
    "extends": [
        'plugin:react/recommended'
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        // "constructor-super":0,
        // 预定义变量可使用(针对fb全局代码)
        "no-undef" : 0,
        // 调试函数
        "no-console": 0,
        "no-alert": 0,
        // 2格缩进
        "indent": [1, 2, {"SwitchCase": 1}],
        // 文件扩展名
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        // 没有状态state定义的函数也可以定义为class
        "react/prefer-stateless-function": 0,
        // 允许使用下划线函数
        "no-underscore-dangle": 0,
        // 所有类型的prop都可以进行传递
        "react/forbid-prop-types": 0,
        // require函数无法解析bug
        "import/no-unresolved": 0,
        // 全局函数不必引用
        "global-require": 0,
        // 不必强制prop-types参数验证
        "react/prop-types": 0,
        // 单行没有长度限制
        "max-len": 0,
        // parseInt等函数可以不用基数参数
        "radix": 0,
        // 箭头函数如果仅仅赋值(ref),可以不用return
        "no-return-assign": 0,
        // 一个文件可以定义多个class
        "react/no-multi-comp": 0,
        // 加减乘除可以不加括号进行混合运算
        "no-mixed-operators": 0,
        // 可以使用++运算符
        "no-plusplus": 0,
        // react组件的key可以用数组索引
        "react/no-array-index-key": 0,
        // 三元表达式可以嵌套使用
        "no-nested-ternary": 0,
        // 函数的输入参数可以重新赋值
        "no-param-reassign": 0,
        // 可以直接使用+号来拼接字符串
        "prefer-template": 0,
        // if分支中及时用了return,也可以使用else,虽然往往是没有必要的
        "no-else-return": 0,
        // store.js let Store莫名报错
        "import/no-mutable-exports": 0,
        // 类方法中可以不使用this
        "class-methods-use-this": 0,
        // 外层作用域可以定义同名变量
        "no-shadow": 0,
        // 函数对应变量可以写在同一行
        "object-curly-newline": 0,
        // 样式代码可以写在同一行
        "linebreak-style": 0,
        // Promise.reject()可以返回普通对象
        "prefer-promise-reject-errors": 0,
        // 可以使用没有名称的function函数(在不使用箭头函数的情况下)
        "func-names": 0,
        // react行内标签中可以使用bind
        "react/jsx-no-bind": 0,
        // 保持语义上的明确, 可以使用没有意义的return
        "no-useless-return": 0,
        // 保持语义上的明确, else嵌套的下层可以使用if, 而不是直接elseif
        "no-lonely-if": 0,
        // 可以使用for...of结构
        "no-restricted-syntax": 0,
        // 循环中可以使用await
        "no-await-in-loop": 0,
        // 循环中可以使用函数
        "no-loop-func": 0,
        // 箭头函数可以直接return; 而没有返回值
        "consistent-return": 0
    }
};
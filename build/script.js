// 筛选二级省市区
const dir = '../lib'
const fs = require('fs')
const render = require('json-templater/object');
const path = require('path');
const endOfLine = require('os').EOL;

const { citys } = require('../src/utils/data')

var OUTPUT_PATH = path.join(__dirname, '../lib/provinceAndCity.js');

var AUTH_TEMPLATE = '{\r"cityName":"{{key}}",\r"cityCode":"{{value}}",\r"subCitys":{{list}},\r},'


var MAIN_TEMPLATE = `
/* 省市 二级数据 */
export default [
{{include}}
]
`

// 遍历数据


// const newCitys = []
function citysList() {
    const fn = (arr, lv = 0) => {
        let level = lv;

        level++;
        return arr.filter((item) => {
            item.defaultIndex = level;
            if (item.subCitys && item.subCitys.length && level <= 1) {
                return fn(item.subCitys, level);

            }
            delete item.subCitys;

        });

    };

    return fn(citys);
}

const newCitys = citysList()



let newTpl = []
createTemplate(newCitys)

// 生成模板
function createTemplate(arr = []) {
    if (!arr.length) return 'error'
    arr.forEach((item, index) => {

        const str = render(AUTH_TEMPLATE, {
            key: item.cityName,
            value: item.cityCode,
            list: JSON.stringify(item.subCitys),
        })
        newTpl.push(str)

    })
    console.log('newTpl',newTpl);
    var template = render(MAIN_TEMPLATE, {
        include: newTpl.join(endOfLine)
    })
    // 写入的路径
    const isHas = fs.existsSync(dir)
    // 如果不存在 就先创建一个config文件夹
    if (!isHas) {
        fs.mkdirSync(dir)
    }
    fs.writeFileSync(OUTPUT_PATH, template);
    console.log(`[build auth] success!`, OUTPUT_PATH);
}
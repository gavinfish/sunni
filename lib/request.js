'use strict'

const request = require('request');
const key = "483416a2b377425c95c78833fa5fb447";

module.exports = function (cityName) {
    let city = encodeURI(cityName);
    let config = {
        url: `https://free-api.heweather.com/v5/weather?city=${city}&key=${key}`,
    };
    request(config).on('data', function (data) {
        let result = JSON.parse(data.toString("utf8"));
        if (result === undefined)
            console.log("\n  无法获取到天气信息 : " + result.msg);
        else
            format(JSON.parse(data.toString("utf8")));
    })
}

var format = function (weather) {
    var basic = weather.HeWeather5[0].basic;
    var current = weather.HeWeather5[0].now;
    var forecast = weather.HeWeather5[0].daily_forecast[1];
    var suggestion = weather.HeWeather5[0].suggestion;
    var aqi = null;
    if (weather.HeWeather5[0].aqi) {
        var aqi = weather.HeWeather5[0].aqi.city;
    }

    console.log("\n  基本信息:".cyan);
    console.log(`   城市: ${basic.city}`);
    console.log(`   日期: ${new Date().toISOString().slice(0, 10)}`);

    console.log("\n  实时天气信息".cyan);
    console.log(`   天气状况: ${current.cond.txt}`);
    console.log(`   气温: ${current.tmp} °C`);
    console.log(`   气压: ${current.pres} pa  风速: ${current.wind.spd} kmph`);
    console.log(`   风向: ${current.wind.dir} 风级: ${current.wind.sc}`);

    console.log("\n  明日天气预测".cyan);
    console.log(`   日期: ${forecast.date}`);
    console.log(`   白天天气状况: ${forecast.cond.txt_d} 夜晚天气状况: ${forecast.cond.txt_n}`);
    console.log(`   最低气温: ${forecast.tmp.min}   最高气温: ${forecast.tmp.max}`);
    console.log(`   降水概率: ${forecast.pop} % 降水量: ${forecast.pcpn} mm 相对湿度: ${forecast.hum} %`);
    console.log(`   气压: ${forecast.pres} pa  风速: ${forecast.wind.spd} kmph`);
    console.log(`   风向: ${forecast.wind.dir} 风级: ${forecast.wind.sc}`);

    if (aqi) {
        console.log("\n  PM 2.5".cyan);
        console.log(`   空气质量指数: ${aqi.aqi}`);
        console.log(`   PM2.5: ${aqi.pm25}`);
        console.log(`   空气质量等级: ${aqi.qlty}`);
    }

    console.log("\n  小建议".cyan);
    console.log(`   舒适度指数`.magenta);
    console.log(`   简介: ${suggestion.comf.brf}`);
    console.log(`   详细描述:   ${suggestion.comf.txt}`);
    console.log(`   洗车指数`.magenta);
    console.log(`   简介:${suggestion.cw.brf}`);
    console.log(`   详细描述:${suggestion.cw.txt}`);
    console.log(`   穿衣指数`.magenta);
    console.log(`   简介:${suggestion.drsg.brf}`);
    console.log(`   详细描述:${suggestion.drsg.txt}`);
    console.log(`   感冒指数`.magenta);
    console.log(`   简介:${suggestion.flu.brf}`);
    console.log(`   详细描述:${suggestion.flu.txt}`);
    console.log(`   运动指数`.magenta);
    console.log(`   简介:${suggestion.sport.brf}`);
    console.log(`   详细描述:${suggestion.sport.txt}`);
    console.log(`   旅游指数`.magenta);
    console.log(`   简介:${suggestion.trav.brf}`);
    console.log(`   详细描述:${suggestion.trav.txt}`);
    console.log(`   紫外线指数`.magenta);
    console.log(`   简介:${suggestion.uv.brf}`);
    console.log(`   详细描述:${suggestion.uv.txt}`);

    console.log("\n  天气更新时间: ".green + basic.update.loc, '\n');
}
// console.log('hello,ts-weather')
import commander from 'commander';
import colors from 'colors';
import axios, { AxiosResponse } from 'axios';

const command = commander
    .version("0.1.0")
    .option("-c, --city [name]", "Add city name")
    .option("-e, --extensions [name]", "all for pre weather, base for current weather")
    .parse(process.argv);
// console.log(process.argv);
if (process.argv.slice(2).length === 0) {
    command.outputHelp(colors.red);
    process.exit();
}
// 调用天气查询
getWeather(command.city, command.extensions);

// BUG 预留一个任务：如何改成成不会自动停止的控制台应用

// if(!command.city){
//     command.outputHelp();
// }
// console.log(command.city);


export interface IWeatherResponse {
    status: string;
    count: string;
    info: string;
    infocode: string;
    lives: Life[];
}

export interface Life {
    province: string;
    city: string;
    adcode: string;
    weather: string;
    temperature: string;
    winddirection: string;
    windpower: string;
    humidity: string;
    reporttime: string;
}


export interface IAllWeatherResponse {
    status: string;
    count: string;
    info: string;
    infocode: string;
    forecasts: Forecast[];
}

export interface Forecast {
    city: string;
    adcode: string;
    province: string;
    reporttime: string;
    casts: Cast[];
}

export interface Cast {
    date: string;
    week: string;
    dayweather: string;
    nightweather: string;
    daytemp: string;
    nighttemp: string;
    daywind: string;
    nightwind: string;
    daypower: string;
    nightpower: string;
}

enum weatherExtension {
    "base" = "base",
    "all" = "all"
}
enum dateWeeks {
    星期一 = 1,
    星期二,
    星期三,
    星期四,
    星期五,
    星期六,
    星期日
}

// const URL = 'https://restapi.amap.com/v3/weather/weatherInfo?';
// const APP_SECRET = "fb8eb372ec0968b6f0819c2f9e1a883c";
// axios.get(`${URL}?city=${encodeURI(command.city)}&key=${APP_SECRET}`)
// .then((res : AxiosResponse<IWeatherResponse>) => {
//     // console.log(res.data);
//     const life = res.data.lives[0];
//     console.log(colors.yellow(life.reporttime));
//     console.log(colors.white(`${life.province}省${life.city}`));
//     console.log(colors.green(`${life.weather} ${life.temperature}度`));
// }).catch(err => {
//     console.log('调用异常，详细：', colors.red(err))
// })
// console.log(command.extensions);
// 查询城市天气信息
// TODO 预留一个bug，为啥extension可以接收其他值
async function getWeather(city: string, extensions?: weatherExtension) {
    const URL = 'https://restapi.amap.com/v3/weather/weatherInfo';
    const APP_SECRET = "fb8eb372ec0968b6f0819c2f9e1a883c";
    let apiUrl = `${URL}?city=${encodeURI(city)}&key=${APP_SECRET}`;
    if (extensions !== undefined) {
        apiUrl = apiUrl + `&extensions=${extensions}`;
    }
    console.log('调用api:' + apiUrl);
    const response = await axios.get(apiUrl);
    // console.log(response.data)
    try {
        if (response.data.lives) {
            for (let life of (response.data as IWeatherResponse).lives) {
                console.log(colors.yellow(life.reporttime));
                console.log(colors.white(`${life.province}省${life.city}`));
                console.log(colors.green(`${life.weather} ${life.temperature}度`));
                console.log('********end*********');
            }
        } else {
            for (let forecast of (response.data as IAllWeatherResponse).forecasts) {
                console.log(colors.yellow(forecast.reporttime));
                console.log(colors.white(`${forecast.province}省${forecast.city}`));
                console.log('未来四天天气预告：')
                forecast.casts.forEach(d => {
                    console.log(colors.yellow(`${d.date} ${dateWeeks[(Number)(d.week)]}`));
                    console.log(colors.blue(`白天：${d.dayweather} 夜晚：${d.nightweather}`));
                });
            }
        }

    } catch (error) {
        console.error('调用天气接口异常');
    }

}
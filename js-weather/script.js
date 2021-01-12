'use strict';
//option要素の取得（配列）
let options = document.querySelectorAll("#select option");

// ページ読み込み時
window.onload = function () {
  //先頭のオプションタグの値を取得
  let firstCityName = options[0].value;
  //使用するappID
  let appId = "4b5774e9f3d2a07b84f0f2f88e486224";
  //urlの取得
  const requestUrl = "https://api.openweathermap.org/data/2.5/weather?APPID=" + appId + "&lang=ja&units=metric&q=" + firstCityName + ",jp;";
  //Ajax通信用のオブジェクトを作成
  let xhr = new XMLHttpRequest();
  //通信方式とURLを設定
  xhr.open("GET", requestUrl);
  //通信を実行する
  xhr.send();
  //通信ステータスが変わったら実行される関数
  xhr.onreadystatechange = function () {
    //通信が完了
    if (xhr.readyState == 4) {
      ShowTodaysWeather(xhr.responseText);
    }
  }
}

//select要素のchangeイベント時
select.addEventListener('change', function () {
  //選択されたoption番号を取得
  let index = this.selectedIndex;
  //現在の天気を取得する場所の名前
  let targetCityName = options[index].value;
  //使用するappID
  let appId = "4b5774e9f3d2a07b84f0f2f88e486224";
  //urlの取得
  const requestUrl = "https://api.openweathermap.org/data/2.5/weather?APPID=" + appId + "&lang=ja&units=metric&q=" + targetCityName + ",jp;";
  //Ajax通信用のオブジェクトを作成
  let xhr = new XMLHttpRequest();
  //通信方式とURLを設定
  xhr.open("GET", requestUrl);
  //通信を実行する
  xhr.send();
  //通信ステータスが変わったら実行される関数
  xhr.onreadystatechange = function () {
    //通信が完了
    if (xhr.readyState == 4) {
      ShowTodaysWeather(xhr.responseText);
    }
  }
});

// 今日の天気を表示する
function ShowTodaysWeather(response) {
  //JSONとして解析、オブジェクトを取得
  let obj = JSON.parse(response);
  //必要な値を取得
  let weather = obj.weather[0].description;
  let city = obj.name;
  let temp = obj.main.temp;
  let humidity = obj.main.humidity;

  document.getElementById('cityweather').textContent = `
  現在の${city}の天気：${weather}`
  document.getElementById('temp').textContent = `
  気温：${temp}°C`
  document.getElementById('humidity').textContent = `
  湿度：${humidity}％`
}

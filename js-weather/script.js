'use strict';
//option要素の取得（配列）
const options = document.querySelectorAll("#select option");

// ページ読み込み時
window.onload = () => {
  //先頭のオプションタグの値を取得
  const firstCityName = options[0].value;
  //使用するappID
  const appId = "4b5774e9f3d2a07b84f0f2f88e486224";
  //urlの取得
  const requestUrl = "https://api.openweathermap.org/data/2.5/weather?APPID=" + appId + "&lang=ja&units=metric&q=" + firstCityName + ",jp;";
  //Ajax通信用のオブジェクトを作成
  const xhr = new XMLHttpRequest();
  //通信方式とURLを設定
  xhr.open("GET", requestUrl);
  //通信を実行する
  xhr.send();
  //通信ステータスが変わったら実行される関数
  xhr.onreadystatechange = () => {
    //通信が完了
    if (xhr.readyState === 4) {
      showTodaysWeather(xhr.responseText);
    };
  };
};

//select要素の取得
const select = document.getElementById('select');

//select要素のchangeイベント時
select.onchange = () => {
  //選択されたoptionのインデックス番号を取得
  const index = select.selectedIndex;
  //現在の天気を取得する場所の名前
  const targetCityName = options[index].value;
  //使用するappID
  const appId = "4b5774e9f3d2a07b84f0f2f88e486224";
  //urlの取得
  const requestUrl = "https://api.openweathermap.org/data/2.5/weather?APPID=" + appId + "&lang=ja&units=metric&q=" + targetCityName + ",jp;";
  //Ajax通信用のオブジェクトを作成
  const xhr = new XMLHttpRequest();
  //通信方式とURLを設定
  xhr.open("GET", requestUrl);
  //通信を実行する
  xhr.send();
  //通信ステータスが変わったら実行される関数
  xhr.onreadystatechange = () => {
    //通信が完了
    if (xhr.readyState === 4) {
      showTodaysWeather(xhr.responseText);
    };
  };
};

// 今日の天気を表示する
const showTodaysWeather = (response) => {
  //JSONとして解析、オブジェクトを取得
  const obj = JSON.parse(response);
  //必要な値を取得
  const weather = obj.weather[0].description;
  const city = obj.name;
  const temp = obj.main.temp;
  const humidity = obj.main.humidity;

  document.getElementById('cityweather').textContent = `現在の${city}の天気：${weather}`;
  document.getElementById('temp').textContent = `気温：${temp}°C`;
  document.getElementById('humidity').textContent = `湿度：${humidity}％`;
};

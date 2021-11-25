'use strict';
/* global $*/

{
    const timer = document.getElementById('timer');
    const start = document.getElementById('start');
    const stop = document.getElementById('stop');
    const reset = document.getElementById('reset');
    // クリック時の時間を保持する
    let startTime;
    // 経過時刻を更新する
    let elapsedTime = 0;
    // タイマーを止めるにはclearTimeoutを使い、引数に渡すIDが必要
    let timerId;
    // タイマーをストップ -> 再開させたら０になってしまうのを避ける変数。
    let timeToadd = 0;
    
    // Activated();
    stop.disabled=true;
    
    function updateTimetText(){
        // 変数 = 13520 / xミリ秒で割った数の商
        let m = Math.floor(elapsedTime / 60000);
        //s(秒) = 135200 % 60000ミリ秒で / 1000 (ミリ秒なので1000で割ってやる) -> 15秒
        let ds = Math.floor(elapsedTime % 60000 / 10000)
        let s = Math.floor(elapsedTime % 60000 / 1000);
        let ms = elapsedTime % 1000;
        
        // 例135200 / 60000 = 2(Math.floorで少数点切捨てるので)-1で末尾一桁固定にできる。
        m = ('0' + m).slice(-1);
        ds = ('0' + ds).slice(-1);
        s = ('0' + s).slice(-1);
        ms = ('0' + ms).slice(1,2);
        
        // 表示させる。
        timer.textContent = m + ':' + ds + ':' + s + ':' + ms;
        
        
    }
    
    function countUp() {
        // timerId変数はsetTimeoutの返り値になるので代入する
        timerId = setTimeout(function(){
            //経過時刻は現在時刻をミリ秒で示すDate.now()からstartを押した時の時刻(startTime)を引く
            elapsedTime = Date.now() - startTime + timeToadd;
            updateTimetText();
            
            //countUp関数自身を呼ぶことで10ミリ秒毎に以下の計算を始める
            countUp();
            
        },10);
    }
    
    // startボタンにクリック時のイベントを追加（タイマースタートイベント）
    start.addEventListener('click', function(){
        
        // クリックした時間を代入
        startTime = Date.now();
        countUp();
        
        Activated();
    });
    
    // stopボタンにクリック時のイベントを追加
    stop.addEventListener('click', function(){
        Activated();
        //タイマーを止めるにはclearTimeoutを使う必要があり、
        // そのためにはclearTimeoutの引数に渡すためのタイマーのidが必要
        clearTimeout(timerId);
        
        // stopした際の経過時間を再開時に＋
        timeToadd += Date.now() - startTime;
    });
    
    // resetボタンにクリック時のイベントを追加
    reset.addEventListener('click', function() {
       elapsedTime = 0;
       timeToadd = 0;
       updateTimetText();
    });
    
    function Activated(){
        if(start.disabled === false){
            start.disabled=true;
            reset.disabled=true;
            stop.disabled=false;
            // start.removeAttribute("disabled");
        }else if(stop.disabled === false){
            start.disabled=false;
            reset.disabled=false;
            stop.disabled=true;
        }
    }
    
}
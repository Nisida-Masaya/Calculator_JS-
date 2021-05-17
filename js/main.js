'use strict';
{
    const number = document.querySelectorAll('.btn-num'); //配列で取得してくれる
    let formu_pro = document.getElementById('process');//式表示 画面の上
    const formu_result = document.getElementById('result');//式結果
    let result = 0;
    let state = 'start';
    //  1)計算する前の最初の状態（start）
    //  2)数字を入力している最中（calculation）
    //  3)「＋ ÷ － × ＝」を押した直後（calBtn）
    //  4)「＝」を教えて計算が終わった直後（finish）

    let mode = 'number_mode'; //最初は数字だけ 小数の時はdot_mode
    //数字ボタン1~9
    const one_nine = document.querySelectorAll('.one_nine');
    one_nine.forEach(num => {
        num.addEventListener('click', () => {
            if (state === 'start') {
                //最初resultに打った数字を代入する
                result = num.value;
            } else if (state === 'finish') {
                //計算後、リセット処理後に、resultに打った数字を代入する
                reset();
                result = num.value;
            } else if (state === 'calculation' || state === 'calBtn') {
                //計算中resultに打った数字を追加して、resultに代入する。
                result += num.value;
            }
            formu_pro.value = result;
            state = "calculation"//数字を入力している状態にする。
        });
    });
    //0ボタン
    const zero = document.getElementById('zero');
    zero.addEventListener('click', () => {
        //一桁前が0の時は0が入力できないようにする
        if (state === 'start' || state === 'finish' || state === 'calBtn' ) {
            if(formu_result.value.slice(-1) === '0'){
                return;
            }
        }

        if (state === 'start') {
            result = zero.value; //先頭に0が着くからNumber()で消す！
        } else {
            result += zero.value;
        }
        formu_pro.value = result;
        // state = 'calculation'; //数字だけ入力
    });
    //小数点ボタン
    const dot = document.getElementById('dot');
    dot.addEventListener('click', () => {
        if (mode === 'dot_mode') {
            return;
        }
        //.1とするとき0.1とする
        if (state === 'start' || state === 'finish') {
            result = 0;
        } else if (state === 'calBtn') {//演算し入力
            if (formu_result.value.slice(-1) !== '0') {
                result = 0;
            }
        }
        result += dot.value;

        formu_pro.value = result;
        state = 'calculation'; //数字だけ入力
        mode = 'dot_mode';
    });
    //[+, -, /, *]
    const cal = document.querySelectorAll('.cal');
    cal.forEach(cal_index => {
        cal_index.addEventListener('click', () => {
            if (state === 'start') {
                //最初に押せないようにする
                return;
            } else if (state === 'calculation') {
                result += cal_index.value //計算中resultに打った記号を追加、resultに追加
            } else if (state === 'finish') {
                //計算後の目の結果をresultに追加
                result = formu_result.value; //計算結果
                result += cal_index.value;
                formu_result.value = 0;
            }
            formu_pro.value = result;
            state = 'calBtn'; //演算記号入力
            mode = 'number_mode';
        });
    });

    //Cボタン
    const clear = document.getElementById('clear');
    clear.addEventListener('click', () => {
        reset();
    });

    //リセット処理
    function reset() {
        result = ""; 
        formu_pro.value = 0;
        formu_result.value = 0;
        mode = 'number_mode'; //整数入力モード
    }

    //=ボタン
    const equal = document.getElementById('equal-btn');
    equal.addEventListener('click', () => {
        formu_result.value = amari(eval(result));
        state = 'finish'; //計算終了
        mode = 'number_mode'; //整数入力モード
    });

    //小数が割り切れなかったら7桁まで表示
    function amari(val){
        return Math.round(val * 1000000) / 1000000;
    }
}
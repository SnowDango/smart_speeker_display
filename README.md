# smart_speeker_display
学校の実習テーマUでのIoT開発でのプロジェクトスマートスピーカーと同期するUIアプリケーション

# 動作想定
* smart speekerでの音声認識で同期モードにする。
* smart speeker -push認識結果-> api server(firebase cloud functions)
* display app -get-> apiserver -> display appでapiの認識結果を定期的に監視
* 上記にてgetした値が変化していたらdisplay表示を変更


<?php
$url = 'http://mp3.zing.vn/bai-hat/Neu-Khong-The-Den-Voi-Nhau-Trinh-Dinh-Quang/ZW6FIBAW.html';
$exp = explode("/",$url);
$id = str_replace(".html","",$exp[count($exp)-1]);
$link = "http://api.mp3.zing.vn/api/mobile/song/getsonginfo?requestdata={\"id\":\"$id\"}";
$data = file_get_contents($link);
$out = json_decode($data, true);
echo "<pre>";
print_r($out);
echo "</pre>";
?>
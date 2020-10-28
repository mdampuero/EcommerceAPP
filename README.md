# nortcuyoapp

$ ionic cordova build --release android --prod

#Si no tengo
$ keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000
#Secreta007
$ jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk alias_name

$ ~/Library/Android/sdk/build-tools/29.0.3/zipalign -v 4 platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk Nortcuyo.apk
import 'dart:io' show Platform;
import 'package:flutter/foundation.dart' show kIsWeb;

class Config {
  static String get baseUrl {
    if (kIsWeb) return 'http://127.0.0.1:8001';
    if (Platform.isAndroid) return 'http://10.0.2.2:8001'; // emulador Android
    return 'http://127.0.0.1:8001'; // iOS sim / desktop
  }
}

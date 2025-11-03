// lib/config.dart

import 'dart:io' show Platform;
import 'package:flutter/foundation.dart' show kIsWeb;

class Config {
  static String get baseUrl {
    const backendApi =
        'http://localhost:8003'; // CAMBIA AQUÍ el puerto si se quiere probar FastAPI (8001),  Django (8002) o SpringBoot (8003)
    if (kIsWeb) return backendApi;
    if (Platform.isAndroid) return 'http://10.0.2.2:8003';
    return backendApi;
  }
}

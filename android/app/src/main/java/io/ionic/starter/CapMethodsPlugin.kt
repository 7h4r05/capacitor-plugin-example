package io.ionic.starter

import android.app.AlertDialog
import android.os.Handler
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import org.json.JSONObject
import java.util.*
import kotlin.concurrent.schedule

@CapacitorPlugin(name = "CapMethodsPlugin")
class CapMethodsPlugin : Plugin() {

  @PluginMethod(returnType = PluginMethod.RETURN_NONE)
  fun openAlert(call: PluginCall) {
    var text = call.getString("text")
    val alertDialogBuilder = AlertDialog.Builder(this.bridge.context)
    alertDialogBuilder.setTitle("My alert")
    alertDialogBuilder.setMessage(text)
    alertDialogBuilder.setPositiveButton(android.R.string.ok) { dialog, which -> }
    alertDialogBuilder.show()
  }

  @PluginMethod(returnType = PluginMethod.RETURN_PROMISE)
  fun getAppVersion(call: PluginCall) {
   var version = BuildConfig.VERSION_CODE

   var result = JSObject()
    result.put("version", version)

    call.resolve(result)
  }

  @PluginMethod(returnType = PluginMethod.RETURN_CALLBACK)
  fun computeAsync(call: PluginCall) {
    Timer().schedule(3000) {
      var a = call.getInt("a") as Int
      var b = call.getInt("b") as Int
      var result = JSObject()
      result.put("result", a + b)
      call.resolve(result)
    }
  }

  var timer: TimerTask? = null
  var runCount: Int = 0

  @PluginMethod(returnType = PluginMethod.RETURN_CALLBACK)
  fun subscribeToCounter(call: PluginCall) {
    if (timer != null) {
      return;
    }

    call.setKeepAlive(true)
    runCount = 0

    timer = Timer().schedule(0, 1000) {
      runCount ++
      var result = JSObject()
      result.put("count", runCount)
      call.resolve(result)
    }
  }

  @PluginMethod(returnType = PluginMethod.RETURN_NONE)
  fun unsubscribeFromCounter(call: PluginCall) {
    var callbackId = call.getString("callbackId");
    if (timer != null) {
      (timer as TimerTask).cancel()
      timer = null
    }
    bridge.releaseCall(callbackId)
  }
}

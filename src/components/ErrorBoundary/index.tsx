import { Component, type ReactNode, type ErrorInfo } from "react";

// تعريف أنواع الخصائص (props)
interface Props {
  children?: ReactNode;
  fallback?: ReactNode; // خاصية اختيارية لعرض مكون بديل
  onError?: (error: Error, errorInfo: ErrorInfo) => void; // callback للتعامل مع الأخطاء
}

// تعريف أنواع الحالة (state)
interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  // تهيئة الحالة الأولية
  public state: State = {
    hasError: false,
  };

  // هذه الدالة تُستدعى بعد حدوث خطأ في مكون فرعي
  public static getDerivedStateFromError(error: Error): State {
    // تحديث الحالة لتظهر واجهة المستخدم البديلة
    return { hasError: true, error };
  }

  // هذه الدالة تُستدعى بعد حدوث خطأ
  // يمكنك استخدامها لتسجيل الخطأ في خدمة خارجية (مثل Sentry أو Bugsnag)
  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Uncaught error:", error, errorInfo);

    // استدعاء callback إذا كان موجود
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // مثال على إرسال الخطأ إلى خدمة تسجيل:
    // logErrorToMyService(error, errorInfo);
  }

  // دالة لإعادة تعيين حالة الخطأ
  public resetError = (): void => {
    this.setState({ hasError: false, error: undefined });
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      // إذا تم تمرير خاصية fallback، نعرضها
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // وإلا، نعرض رسالة خطأ افتراضية.
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              حدث خطأ غير متوقع
            </h1>
            <p className="text-gray-600 mb-4">
              نعتذر، حدث خطأ في التطبيق. يرجى إعادة تحميل الصفحة.
            </p>
            <button
              onClick={this.resetError}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              إعادة المحاولة
            </button>
          </div>
        </div>
      );
    }

    // إذا لم يكن هناك خطأ، نعرض المكونات الأبناء كما هي
    return this.props.children;
  }
}

export default ErrorBoundary;

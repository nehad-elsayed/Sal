import { useSearchParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/Forms/LoginForm";

export default function Login() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Get current tab from URL, default to 'login'
  const currentTab = searchParams.get("tab") || "login";

  const handleTabChange = (tab: string) => {
    setSearchParams({ tab });
  };

  // Handle navigation between login and signup
  const handleSignInClick = () => {
    navigate("/login?tab=login");
  };

  const handleSignUpClick = () => {
    navigate("/signup?tab=signup");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="max-w-6xl w-full overflow-hidden shadow-lg rounded-2xl">
        <div className="flex">
          {/* Left Section - Form */}
          <div className="flex-1 p-8 lg:p-12 bg-blue-50">
            <div className="max-w-md mx-auto">
              {/* Logo/Title */}
              <h1 className="text-center text-2xl md:text-6xl font-serif italic font-medium text-black mb-8 tracking-wide">
                Sal
              </h1>

              {/* Tabs */}
              <Tabs value={currentTab} onValueChange={handleTabChange} className="mb-8">
                <TabsList className="grid mx-auto grid-cols-2 w-1/2">
                  <TabsTrigger
                    value="login"
                    className="rounded-full py-2 ms-auto w-fit tracking-wide data-[state=active]:bg-primary data-[state=active]:text-white text-[#0078D4]"
                    onClick={handleSignInClick}
                    style={{
                      backgroundColor: "#0078D4",
                      color: "#fff",
                    }}
                  >
                    Sign in
                  </TabsTrigger>
                  <TabsTrigger
                    value="signup"
                    className="rounded-full py-2 w-fit tracking-wide text-[#0078D4]"
                    onClick={handleSignUpClick}
                  >
                    Sign up
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="mt-6">
                  <LoginForm />
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Right Section - Illustration */}
          <div className="hidden lg:flex flex-1 bg-white relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e0f2fe' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>

            {/* Characters and Speech Bubbles */}
            <div className="relative z-10 flex items-center justify-center w-full h-full p-8">
              <div className="relative">
                {/* Left Character */}
                <div className="absolute -left-16 top-8">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>

                {/* Right Character */}
                <div className="absolute -right-16 top-8">
                  <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
                    </div>
                  </div>
                  <div className="absolute -top-2 -left-2 w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>

                {/* Speech Bubbles */}
                <div className="absolute -top-8 left-4">
                  <div className="bg-white rounded-lg p-2 shadow-lg">
                    <div className="text-2xl">?</div>
                  </div>
                </div>
                <div className="absolute -top-8 right-4">
                  <div className="bg-blue-600 rounded-lg p-2 shadow-lg">
                    <div className="text-2xl text-white">?</div>
                  </div>
                </div>
                <div className="absolute top-4 -left-8">
                  <div className="bg-blue-400 rounded-lg p-2 shadow-lg">
                    <div className="text-2xl text-white">?</div>
                  </div>
                </div>
                <div className="absolute top-4 -right-8">
                  <div className="bg-white rounded-lg p-2 shadow-lg">
                    <div className="text-2xl">?</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

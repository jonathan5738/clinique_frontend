import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router";
import { store } from "./store";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import "./index.css"
import BlogPost from "./pages/BlogPost";
import BlogPostDetail from "./components/blog/BlogPostDetail";
import BlogHomepage from "./components/blog/BlogHomepage";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { gsap } from "gsap/gsap-core";
import AdminPage from "./components/dashboard/AdminPage";
import { ToastContainer } from "react-tiny-toast";
import MainPage from "./components/dashboard/MainPage";
import { BlogCreationPage } from "./components/dashboard/BlogCreationPage";
import App from "./App";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText)
const element = document.getElementById("root")!;
const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                index: true,
                Component: Homepage
            },
            {
                path: "dashboard",
                Component: AdminPage,
                children: [
                    {
                        index: true,
                        Component: MainPage
                    },
                    {
                        path: "blogs",
                        children: [
                            {path: "posts/new", Component: BlogCreationPage}
                        ]
                    },
                ]
            },

            {
                path:"blog",
                Component: BlogPost,
                children: [
                    {
                        index: true,
                        Component: BlogHomepage
                    },
                    {
                        path: ":blogId",
                        Component: BlogPostDetail
                    }
                ]
           }
        ]
    },
    {
        path: "/testing/:doctorId",
        Component: Dashboard
    }
]);

createRoot(element).render(
    <Provider store={store}>
        <ToastContainer/>
        <RouterProvider router={router}/>
    </Provider>
)
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import "./index.scss";
import { PageAbout } from "./pages/PageAbout.tsx";
import { Page404 } from "./pages/Page404.tsx";
import { StoreProvider } from 'easy-peasy';
import { store } from './store/store.ts';
import { PageFlashcards } from "./pages/PageFlashcards.tsx";
import { PageText } from "./pages/PageText/PageText.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		errorElement: <Page404 />,
		element: <App />,
		children: [
			{
				path: "text/:chapter",
				element: <PageText />,
			},
			{
				path: "flashcards",
				element: <PageFlashcards />,
			},
			{
				path: "about",
				element: <PageAbout />,
			},
			{
				path: "/",
				element: <Navigate to="/text/1" replace />,
			},
			{
				path: "/text",
				element: <Navigate to="/text/1" replace />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<StoreProvider store={store}>
		<RouterProvider router={router} />
	</StoreProvider>
);

import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <>
      <div className="container mt-5 vstack gap-3">
        <h3 className="text-danger">Oops</h3>
        {isRouteErrorResponse(error)
          ? "Sorry, this page does not exist."
          : "An unexpected error occurred."}
      </div>
    </>
  );
};

export default ErrorPage;

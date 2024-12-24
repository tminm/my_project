import PropTypes from "prop-types";
import React, { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeHeaderConfigAction } from "store/modules/main";

const Login = memo((props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeHeaderConfigAction({ isFixed: false, topAlpha: false }));
  }, [dispatch]);
  return (
    <div className="login">
      <h1>这是登录页面</h1>
    </div>
  );
});

export default Login;

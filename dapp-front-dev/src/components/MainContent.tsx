import { useEffect, useState } from "react";
import { ethers } from "ethers";

export default function MainContent() {
  //1、获取签名和账户信息

  //2、添加分红用户

  //3、查看分红

  //4、领取分红

  return (
    <>
      {/* 标题 */}
      <h3>分红管理表</h3>

      {/* 操作表 */}
      <div>
        <h4>添加单个分红用户</h4>
        <h4>添加多个分红用户</h4>
        <div></div>
        <div>分发分红</div>

        <h4>查看分红</h4>
        <div></div>
        <div>查看</div>

        <h4>领取分红</h4>
        <div></div>
        <div>领取</div>
      </div>
    </>
  );
}

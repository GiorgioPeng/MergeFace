## 这是一个使用 face++ 接口实现人脸融合的在线项目

[在线使用](https://giorgiopeng.github.io/MergeFace/)
---

### 需要什么？

- 一张自拍 / 或者图片
- 一张模板
- 你的 face++ api_key
- 你的 face++ api_secret

> :trollface: 因为是纯前端项目，避免被恶意使用，因此需要使用者自己的 face++ 账号的秘钥对
> 没有 face++?
> [这里是注册地址](https://console.faceplusplus.com.cn/register)

### 步骤

- 左边现场自拍 / 或者图片
- 右边放入模板
- 中间填写 api_key 和 api_secret
- 点击 + 号等待结果

### 注意事项

- 因为是在线使用 canvas 重绘视频，可能帧率不是很高

- 图片像素尺寸：最小 200\*200 像素，最大 4096\*4096 像素

- 最小人脸像素尺寸： 为了保证融合效果，推荐图片中人脸框（正方形）边长的最小值不低于 200 像素。

- 人脸质量：人脸质量越高，则融合效果越好。影响人脸质量的因素包括：对人脸五官的遮挡、不当的光照（强光、暗光、逆光）、过大的人脸角度（推荐 yaw ≤ ±10°, pitch ≤ ±10°）等。

- 目前不支持黑白照片。


### 查看这个项目源码能够看到哪些知识?

- react框架和react-hooks基本使用

- 重写input\[type='file'\]样式的方法

- material-ui的使用(一般使用和媒体查询hook)

- jss使用(基于material-ui提供的hook)

- 通过浏览器调用摄像头的方法

- canvas将图片压缩至指定大小(不是压缩至指定长宽)

- 跨域post请求(通过jquery), 构造form表单提交的数据结构

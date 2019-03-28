## bootstrap plugin

#### 依赖于bootstrap的pagination组件，写出来的分页插件。

*****

bootstrap的pagination组件，仅仅是样式，缺少分页的事件，所以在此基础上，构建了一个分页事件

需要依赖于其bootstrap布局结构:
  `<nav aria-label="Page navigation">
    <ul class="pagination" id="pagination">
    </ul>
  </nav>`
1.const data = getService("students?", `page=${page}&limit=10`, token);
  console.log(data)
  return data
  返回值是一个Promise 不能直接取到值
Promise {<pending>}
[[Prototype]]: Promise
[[PromiseState]]: "fulfilled"
[[PromiseResult]]: Object
做了这样的处理才拿到值
getStudents(currentPage, token).then(function (res) {
      setDataSource(res.data.students);
      setTotalPages(res.data.total);
    });
有没有直接取到值的办法
-------------------------------------------------------------------------------------
05/04/2022
1.edit的弹窗CSS样式有问题
-------------------------------------------------------------------------------------
15/04/2022
1.studnt detail page css样式问题 边框 居中
-------------------------------------------------------------------------------------
30/04/2022
1.edit student时 edit了第二个学生第一个学生的信息才更新在页面上
2.看一下edit教师的页面和teacher detail的页面
3.Coures 页面的分割线的样式
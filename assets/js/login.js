$(function() {
    // 注册账号
    $(`#gotoReg`).click(function() {
        // 显示注册界面
        $(`.regiBox`).show()
            // 显示登录界面
        $(`.loginBox`).hide()

    })
    $(`#gotoLogin`).click(function() {
        // 显示注册界面
        $(`.regiBox`).hide()
            // 显示登录界面
        $(`.loginBox`).show()
    })
    let form = layui.form
    form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repass: function(value) {
            // console.log(value);
            let pwd = $(".regiBox [name=password]").val()
            if (value !== pwd) {
                return `两次密码不一致`
            }
        }
    })

    $(`.loginBox .layui-form`).on(`submit`, function(e) {
        e.preventDefault()
        let data = $(this).serialize()
        console.log(data);
        axios.post(`/api/reguser`, data).then((res) => {
            if (res.data.status !== 0) {
                // 注册失败
                return layer.msg(res.data.message)
            }
            layer.msg("注册成功，请登录")
            $("#gotoLogin").click()
        })
    })
    $(".loginBox form").on("submit", function(e) {
        e.preventDefault();

        let data = $(this).serialize();

        axios.post("/api/login", data).then((res) => {
            console.log(res.data);

            if (res.data.status !== 0) {
                // 登录失败
                return layer.msg(res.data.message);
            }
            localStorage.setItem("token", res.data.token)
            layer.msg("登录成功，即将跳转去首页！", function() {
                // 关闭后 do something
                // 跳转页面
                location.href = "/home/index.html";
            });
        });
    });
})
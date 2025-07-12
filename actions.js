// xử lý menu tabs
document.addEventListener('DOMContentLoaded', function(){
    const menu_toggle = document.getElementById("menu_toggle");
    const nav = document.querySelector(".nav_right");
    const nav_menu = document.getElementById("nav_menu");


    // 1. Khi click vao thi se Bat/tat
    menu_toggle.addEventListener('click', function(e){
        e.stopPropagation();
        nav.classList.toggle('nav_active');
    });

    // 2. Dong menu khi click ra ngoai:
    document.addEventListener('click', (e)=>{
        if(nav.classList.contains('nav_active') && !nav_menu.contains(e.target) && !menu_toggle.contains(e.target)){
            nav.classList.remove('nav_active');
        }
    });
})



// Xử lý modal
document.addEventListener('DOMContentLoaded', function() {

    // --- LOGIC XỬ LÝ MODAL (POP-UP) ---
    const modal = document.getElementById('registrationModal');
    const openModalButtons = document.querySelectorAll('.open-modal-btn');
    const closeModalButton = document.querySelector('.close-btn');

    // Hàm mở modal
    function openModal() {
        modal.style.display = 'block';
    }

    // Hàm đóng modal
    function closeModal() {
        modal.style.display = 'none';
    }

    // Gán sự kiện click cho tất cả các nút "Đăng ký"
    openModalButtons.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    // Gán sự kiện click cho nút đóng (dấu X)
    closeModalButton.addEventListener('click', closeModal);

    // Gán sự kiện click ra ngoài để đóng modal
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            closeModal();
        }
    });


    // --- LOGIC XỬ LÝ GỬI FORM ĐĂNG KÝ (SỬ DỤNG WEB3FORMS) ---
    const form = document.getElementById('regForm');
    const resultDiv = document.getElementById('form-result');

    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Ngăn form gửi theo cách mặc định
        
        const formData = new FormData(form);
        const object = {};
        formData.forEach((value, key) => {
            object[key] = value;
        });
        const json = JSON.stringify(object);

        resultDiv.innerHTML = "Đang gửi thông tin...";
        resultDiv.style.color = 'blue';

        fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let jsonResponse = await response.json();
                if (response.status == 200) {
                    resultDiv.innerHTML = "Đăng ký thành công! Chúng tôi sẽ liên hệ lại với bạn sớm.";
                    resultDiv.style.color = 'green';
                } else {
                    console.log(response);
                    resultDiv.innerHTML = jsonResponse.message;
                    resultDiv.style.color = 'red';
                }
            })
            .catch(error => {
                console.log(error);
                resultDiv.innerHTML = "Có lỗi xảy ra, vui lòng thử lại!";
                resultDiv.style.color = 'red';
            })
            .then(function() {
                form.reset(); // Xóa nội dung form
                setTimeout(() => {
                    resultDiv.innerHTML = ''; // Xóa thông báo sau vài giây
                    closeModal(); // Tự động đóng modal sau khi thành công
                }, 4000);
            });
    });
});
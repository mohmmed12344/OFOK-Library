// تعريف المتغير لتخزين الكتاب المختار
let selectedBook = "";

function proceed() {
    // الحصول على زر الراديو المختار
    const radios = document.getElementsByName("book");
    selectedBook = ""; // إعادة تعيين الكتاب المختار

    // البحث عن الكتاب المختار
    for (const radio of radios) {
        if (radio.checked) {
            selectedBook = radio.value;
            break;
        }
    }

    // التحقق من اختيار كتاب
    if (!selectedBook) {
        alert("يرجى اختيار كتاب."); // تنبيه إذا لم يتم اختيار كتاب
        return;
    }

    // عرض نموذج الزبون
    showUserForm();
}

function showUserForm() {
    // إنشاء نموذج الزبون ديناميكيًا
    const formContainer = document.getElementById("formContainer");
    formContainer.innerHTML = `
        <form id="userForm">
            <h2>نموذج معلومات الزبون</h2>
            <p>الكتاب المختار: ${selectedBook}</p>
           <label>الاسم الكامل:</label>
            <input type="text" id="fullName" placeholder="أدخل اسمك الكامل"><br><br>
            
            <label>الرقم الوطني:</label>
            <input type="text" id="nationalID" placeholder="أدخل الرقم الوطني (11 خانة)" required><br><br>
            
            <label>تاريخ الميلاد:</label>
            <input type="text" id="birthDate" placeholder="dd-mm-yyyy"><br><br>
            
            <label>رقم الموبايل:</label>
            <input type="text" id="mobile" placeholder="أدخل رقم الموبايل"><br><br>
            
            <label>الإيميل:</label>
            <input type="email" id="email" placeholder="example@example.com"><br><br>
            
            <button type="button" onclick="submitForm()">إرسال</button>
            <p class="error" id="error"></p>
        </form>
        
    `;
}

function submitForm() {
    const fullName = document.getElementById("fullName").value.trim();
    const nationalID = document.getElementById("nationalID").value.trim();
    const birthDate = document.getElementById("birthDate").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const email = document.getElementById("email").value.trim();
    const errorElement = document.getElementById("error");

    // تحقق من الرقم الوطني (إلزامي)
    if (!/^\d{11}$/.test(nationalID)) {
        alert("الرقم الوطني مطلوب ويجب أن يكون مكونًا من 11 رقمًا.");
        return;
    }

    // التحقق من تنسيق الاسم الكامل اذا كانت غير فارغة)
    if (fullName && !/^[\u0621-\u064A\s]+$/.test(fullName)) {
        alert("الاسم الكامل يجب أن يحتوي على حروف عربية فقط.");
        return;
    }

    // التحقق من تنسيق تاريخ الميلاد اذا كانت غير فارغة)
    if (birthDate && !/^\d{2}-\d{2}-\d{4}$/.test(birthDate)) {
        alert("تاريخ الميلاد يجب أن يكون بالتنسيق dd-mm-yyyy.");
        return;
    }

    // التحقق من تنسيق رقم الموبايل اذا كانت غير فارغة)
    if (mobile && !/^(09\d{8})$/.test(mobile)) {
        alert("رقم الموبايل غير صالح. يجب ان يطابق شبكتين mtn and syriatel.");
        return;
    }

    // التحقق من تنسيق البريد الإلكتروني اذا كانت غير فارغة)
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("البريد الإلكتروني غير صالح.");
        return;
    }

    // عرض رسالة النجاح باستخدام alert
    const [bookName, bookPrice] = selectedBook.split(", ");
    const successMessage = `
        تم إرسال النموذج بنجاح!
        --- بيانات الكتاب ---
        اسم الكتاب: ${bookName}
        السعر: ${bookPrice} ل.س

        --- بيانات الزبون ---
        الاسم الكامل: ${fullName || "غير مدخل"}
        الرقم الوطني: ${nationalID}
        تاريخ الميلاد: ${birthDate || "غير مدخل"}
        رقم الموبايل: ${mobile || "غير مدخل"}
        البريد الإلكتروني: ${email || "غير مدخل"}
    `;

    alert(successMessage);

    // إعادة تعيين النموذج
    document.getElementById("userForm").reset();
    errorElement.innerText = "";
}
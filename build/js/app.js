const maskOptions = {
   mask: "000-00-000",
   // lazy: false,  // make placeholder always visible
   // placeholderChar: '0'     // defaults to '_'
};
if (document.querySelectorAll("[data-phone]").length) {
   document.querySelectorAll("[data-phone]").forEach((item) => {
      const mask = IMask(item, maskOptions);
   });
}
const body = document.body;
document.addEventListener("DOMContentLoaded", () => {
   let isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

   if (isSafari) {
      // Если Safari, добавляем класс к body или другому элементу
      document.body.classList.add("safari-browser");
   }
   homePage();
   if (window.innerWidth <= 568) {
      accordion(".footer__subheader", ".footer__item .collapse");
   }
   if (window.innerWidth <= 1024) {
      accordion(".header__item:has(.header-services) > a", ".header-services");
   }
   burgerWork();
   accordion(".service-process__header", ".service-process__collapse");
   newsSection();
   casesPage();
   casePage();
});
function burgerWork() {
   const burger = document.querySelector(".header__burger");
   if (!burger) return;
   const menu = document.querySelector(".header-menu");
   burger.onclick = () => {
      burger.classList.toggle("active");
      menu.classList.toggle("active");
      body.classList.toggle("lock");
   };
}
function homePage() {
   function why() {
      const btn = document.querySelector(".home-why__main button");
      const text = document.querySelector(".home-why__text");
      if (!btn) return;
      btn.onclick = () => {
         btn.classList.toggle("active");
         text.classList.toggle("active");
      };
   }
   function blog() {
      if (document.querySelector(".blog-section .swiper"))
         new Swiper(document.querySelector(".blog-section .swiper"), {
            slidesPerView: 1,
            // initialSlide: 2,
            spaceBetween: 32,

            pagination: {
               el: ".blog-section .swiper-pagination",
               type: "progressbar",
            },
            navigation: {
               prevEl: ".blog-section__header .prev",
               nextEl: ".blog-section__header .next",
            },
         });
   }
   function fullControl() {
      if (!document.querySelector("#full-control-select")) return;
      new Select("#full-control-select", {
         placeholder: "Select your challenge",
         // selectedId: "volg",
         data: [
            {
               id: "challenge1zxz",
               value: "challenge 1",
            },
            {
               id: "challengeasdas",
               value: "challenge 2",
            },
            {
               id: "challengelklk",
               value: "challenge 3",
            },
         ],
         onSelect(item, select) {
            select.classList.add("filled");
         },
      });
   }
   why();
   blog();
   fullControl();
   tabs('input[name="home-optimize"]', ".home-optimize__content > div");
   accordion(".faq-section__subheader", ".faq-section__collapse");
}
function tabs(linkSelector, contentSelector) {
   const inputs = document.querySelectorAll(linkSelector);
   const contents = document.querySelectorAll(contentSelector);
   let value;
   if (inputs.length) {
      inputs.forEach((item) => {
         item.addEventListener("change", () => {
            if (item.checked) {
               value = item.value;
            }
            contents.forEach((item) => {
               item.classList.remove("active");
               if (item.getAttribute("data-tab") == value) {
                  item.classList.add("active");
               }
            });
         });
      });
   }
}
function accordion(linkSelector, contentSelector) {
   // получаем линки
   const openLinks = document.querySelectorAll(`${linkSelector}`);
   // контенты
   const contents = document.querySelectorAll(`${contentSelector}`);
   if (openLinks.length > 0) {
      for (let i = 0; i < openLinks.length; i++) {
         let openLink = openLinks[i];
         openLink.addEventListener("click", () => {
            // все прячем
            for (let j = 0; j < contents.length; j++) {
               // если хоть один открывается - return
               if (contents[j].classList.contains("collapsing")) {
                  return;
               } // Иначе
               // все прячем
               slideHide(contents[j]);
            }
            for (let j = 0; j < openLinks.length; j++) {
               openLinks[j].classList.remove("active");
            }
            // записываем в переменную нужный таб
            let content = contents[i];
            // работаем с классами линка
            if (content.classList.contains("collapsing")) {
               return;
            } else if (content.classList.contains("collapse_show")) {
               openLink.classList.remove("active");
            } else {
               openLink.classList.add("active");
            }
            // показываем нужный
            slideShow(content);
         });
      }
   }
}
function casesPage() {
   const selects = document.querySelectorAll(".cases-filters__selects label");

   if (!selects.length) return;
   selects.forEach((select) => {
      select.onclick = () => {
         select.classList.toggle("active");
         let attr = select.getAttribute("for");

         const target = document.querySelector(`[data-value="${attr}"]`);

         target.classList.toggle("active");
      };
   });
}
function casePage() {
   const slider = document.querySelector(".case-team__slider .swiper");
   if (!slider) return;
   // Инициализация основного слайдера

   // Инициализация слайдера с миниатюрами
   let thumbs = new Swiper(".case-team__thumbs .swiper", {
      slidesPerView: "auto",
      spaceBetween: 12,
      loop: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
   });
   let main = new Swiper(slider, {
      slidesPerView: 1,
      spaceBetween: 12,
      loop: true,
      pagination: {
         el: ".case-team__pagination", // Указываем элемент для пагинации
         type: "custom", // Используем кастомный тип
         renderCustom: function (swiper, current, total) {
            return `<span>${current}</span>/<span style="opacity: 0.3">${total}</span>`; // Формат пагинации
         },
      },
      navigation: {
         prevEl: ".case-team .prev",
         nextEl: ".case-team .next",
      },
      thumbs: {
         swiper: thumbs,
      },
   });
}
function slideShow(el, duration = 500) {
   // завершаем работу метода, если элемент содержит класс collapsing или collapse_show
   if (
      el.classList.contains("collapsing") ||
      el.classList.contains("collapse_show")
   ) {
      return;
   }
   // удаляем класс collapse
   el.classList.remove("collapse");
   // сохраняем текущую высоту элемента в константу height (это значение понадобится ниже)
   const height = el.offsetHeight;
   // устанавливаем высоте значение 0
   el.style["height"] = 0;
   // не отображаем содержимое элемента, выходящее за его пределы
   el.style["overflow"] = "hidden";
   // создание анимации скольжения с помощью CSS свойства transition
   el.style["transition"] = `height ${duration}ms ease`;
   // добавляем класс collapsing
   el.classList.add("collapsing");
   // получим значение высоты (нам этого необходимо для того, чтобы просто заставить браузер выполнить перерасчет макета, т.к. он не сможет нам вернуть правильное значение высоты, если не сделает это)
   el.offsetHeight;
   // установим в качестве значения высоты значение, которое мы сохранили в константу height
   el.style["height"] = `${height}px`;
   // по истечении времени анимации this._duration
   window.setTimeout(() => {
      // удалим класс collapsing
      el.classList.remove("collapsing");
      // добавим классы collapse и collapse_show
      el.classList.add("collapse");
      el.classList.add("collapse_show");
      // удалим свойства height, transition и overflow
      el.style["height"] = "";
      el.style["transition"] = "";
      el.style["overflow"] = "";
   }, duration);
}
function slideHide(el, duration = 500) {
   // завершаем работу метода, если элемент содержит класс collapsing или collapse_show
   if (
      el.classList.contains("collapsing") ||
      !el.classList.contains("collapse_show")
   ) {
      return;
   }
   // установим свойству height текущее значение высоты элемента
   el.style["height"] = `${el.offsetHeight}px`;
   // получим значение высоты
   el.offsetHeight;
   // установим CSS свойству height значение 0
   el.style["height"] = 0;
   // обрежем содержимое, выходящее за границы элемента
   el.style["overflow"] = "hidden";
   // добавим CSS свойство transition для осуществления перехода длительностью this._duration
   el.style["transition"] = `height ${duration}ms ease`;
   // удалим классы collapse и collapse_show
   el.classList.remove("collapse");
   el.classList.remove("collapse_show");
   // добавим класс collapsing
   el.classList.add("collapsing");
   // после завершения времени анимации
   window.setTimeout(() => {
      // удалим класс collapsing
      el.classList.remove("collapsing");
      // добавим класс collapsing
      el.classList.add("collapse");
      // удалим свойства height, transition и overflow
      el.style["height"] = "";
      el.style["transition"] = "";
      el.style["overflow"] = "";
   }, duration);
}
function newsSection() {
   if (!document.querySelector(".news-section .swiper")) return;
   let slider = new Swiper(document.querySelector(".news-section .swiper"), {
      slidesPerView: 1,
      breakpoints: {
         1025: {
            slidesPerView: 4,
            spaceBetween: 20,
         },
      },
      navigation: {
         prevEl: ".news-section .prev",
         nextEl: ".news-section .next",
      },
   });
   if (!document.querySelector(".blog-what .swiper")) return;
   let slider2 = new Swiper(document.querySelector(".blog-what .swiper"), {
      slidesPerView: 1,
      breakpoints: {
         1025: {
            slidesPerView: 4,
            spaceBetween: 20,
         },
      },
      navigation: {
         prevEl: ".blog-what .prev",
         nextEl: ".blog-what .next",
      },
   });
}
class Select {
   constructor(selector, options) {
      this.$el = document.querySelector(selector);
      this.options = options;
      this.selectedId = options.selectedId;

      this.render();
      this.setup();
   }
   render() {
      this.$el.classList.add("select");
      const { placeholder, data, selectedId } = this.options;
      this.$el.innerHTML = this.getTemplate(data, placeholder, selectedId);
      if (placeholder) {
         this.$el
            .querySelector(`[data-type="input"]`)
            .classList.add("placeholder");
      }
   }
   setup() {
      this.clickHandler = this.clickHandler.bind(this);
      this.$el.addEventListener("click", this.clickHandler);
      this.$value = this.$el.querySelector(`[data-type="input"] span`);
   }
   clickHandler(event) {
      const { type } = event.target.dataset;
      if (type === "input") {
         this.toggle();
      } else if (type === "item") {
         const { id } = event.target.dataset;
         this.select(id);
      } else if (type === "back") {
         this.toggle();
      } else if (type === "header") {
         this.toggle();
      } else if (event.target.closest(".select__header")) [this.toggle()];
   }
   get current() {
      return this.options.data.find((item) => item.id === this.selectedId);
   }
   select(id) {
      this.$el
         .querySelector(`[data-type="input"]`)
         .classList.remove("placeholder");
      this.selectedId = id;
      console.log(this.$value);
      this.$value.innerHTML = `<img src="${this.current.image}"> ${this.current.value}`;
      this.$el.querySelectorAll(`[data-type="item"]`).forEach((item) => {
         item.classList.remove("selected");
      });
      this.$el
         .querySelector(`[data-id =${this.current.id}]`)
         .classList.add("selected");
      this.close();

      if (this.options.onSelect) {
         this.options.onSelect(this.current, this.$el);
      }
   }
   open() {
      this.$el.classList.add("open");
   }
   close() {
      this.$el.classList.remove("open");
   }
   toggle() {
      if (this.$el.classList.contains("open")) {
         this.close();
      } else {
         this.open();
      }
   }
   getTemplate(data, placeholder = `<span></span>`, selectedId) {
      const items = data.map((item) => {
         let cls = "";
         if (item.id === selectedId) {
            placeholder = `<img src="${this.current.image}"> ${this.current.value}`;
            cls = "selected";
         }
         return `<li class="select__item ${cls}" data-type="item" data-id="${item.id}"><img src="${item.image}"> ${item.value}</li>`;
      });
      return `
      <div class="select__header" data-type="header">
      <div class="select__back" data-type="back"></div>
      <div class="select__title" data-type="input">
         <span>${placeholder}</span>
         <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 10.5L12.0008 15.08L17 10.5" stroke="#323137" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
         </svg>

    </div>
      </div>
      <div class="select__content">
         <ul class="select__list">
            ${items.join("")}
         </ul>
      </div>
      `;
   }
}

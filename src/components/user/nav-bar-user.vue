<template>
  <div class="d-flex justify-content-between py-2 align-items-center nav-bar-user-wrapper">
    <div v-if="!openLogo">
      <img class="logo-img" src="./../../assets/logobunbohue06082016100021.jpg" alt="" />
    </div>
    <div v-if="!openLogo" class="text-white">
      <ul>
        <li
          :class="menu == 'user.home' ? 'active' : ''"
          class="menu-item"
          @click="checkName('user.home')"
        >
          Trang chủ
        </li>
        <li
          :class="menu == 'user.specialty' ? 'active' : ''"
          class="menu-item"
          @click="checkName('user.specialty')"
        >
          Đặc sản
        </li>
        <li
          :class="menu == 'user.food' ? 'active' : ''"
          class="menu-item"
          @click="checkName('user.food')"
        >
          Đồ ăn
        </li>
        <li
          :class="menu == 'user.drink' ? 'active' : ''"
          class="menu-item"
          @click="checkName('user.drink')"
        >
          Thức uống
        </li>
        <li
          v-if="user"
            :class="menu == 'user.order' ? 'active' : ''"
            class="menu-item"
            @click="checkName('user.order')"
          >
            Đơn hàng
          </li>
      </ul>
    </div>
    <div v-else class="text-white" style="position: relative">
      <i class="bx bx-menu" style="font-size: 30px" @click="openMenu = !openMenu"> </i>
      <ul
        v-if="openMenu"
        class="dropdown-list"
        style="position: absolute; top: 42px; left: -5px; background-color: white"
      >
        <li
          class="dropdown-item"
          :class="menu == 'user.home' ? 'active' : ''"
          @click="checkName('user.home')"
        >
          Trang chủ
        </li>
        <li
          class="dropdown-item"
          :class="menu == 'user.specialty' ? 'active' : ''"
          @click="checkName('user.specialty')"
        >
          Đặc sản
        </li>
        <li
          class="dropdown-item"
          :class="menu == 'user.food' ? 'active' : ''"
          @click="checkName('user.food')"
        >
          Đồ ăn
        </li>
        <li
          class="dropdown-item"
          :class="menu == 'user.drink' ? 'active' : ''"
          @click="checkName('user.drink')"
        >
          Thức uống
        </li>
        <li
          class="dropdown-item"
          :class="menu == 'user.order' ? 'active' : ''"
          @click="checkName('user.order')"
        >
          Đơn hàng
        </li>
      </ul>
    </div>
    <div v-if="!user" class="">
      <b-button variant="light" @click="$router.push({ name: 'register-login' })"
        >Đăng nhập</b-button
      >
    </div>
    <div class="d-flex" v-else>
      <div class="cart">
        <i class="bx bxs-cart" style="position: relative" @click="dropItem">
          <b-badge v-if="quantity != 0" variant="danger" class="badge">{{ quantity }}</b-badge>
        </i>
        <div
          v-if="dropdownItem && entries?.products?.length"
          class="bg-white"
          style="
            position: absolute;
            border: 1px solid gainsboro;
            padding: 10px;
            right: 0;
            min-width: 300px;
          "
        >
          <div
            class="d-flex justify-content-between border-bottom py-2"
            v-for="item in entries.products"
            :key="item.product.id"
          >
            <div class="d-flex">
              <img style="width: 70px; height: 70px" :src="item.product.image?.secure_url" alt="" />

              <div class="pl-2">
                <div class="font-size-16 pb-3" style="color: black">
                  {{ item.product.name }}
                </div>
                <div class="font-size-16 text-secondary">
                  {{ item.quantity }} x {{ item.product.price }}
                </div>
              </div>
            </div>

            <div class="font-size-26 text-secondary">
              <i class="bx bx-x-circle" @click.stop="removeItem(item)"></i>
            </div>
          </div>
          <div class="border-bottom py-2 font-size-16 text-center" style="color: orange">
            Tạm tính:
            <span class="font-size-20" style="">{{ entries.totalProducts }}</span>
          </div>
          <div>
            <b-button
              class="w-100"
              variant="primary"
              @click="checkName('user.cart'), (dropdownItem = false)"
              >Xem giỏ hàng</b-button
            >
          </div>
        </div>
      </div>
      <div
        class="cursor-pointer d-flex align-items-center"
        @click="dropdown = !dropdown"
        style="position: relative"
      >
        <span class="text-white font-size-16 px-2">Tài khoản</span>
        <i v-if="!openLogo" class="bx bx-chevron-down font-size-20 text-white"></i>
        <div class="pt-1 cursor-pointer dropdown-list" v-if="dropdown">
          <div class="pl-2 pb-2 dropdown-item" @click="modalInformation = !modalInformation">
            <i class="bx bx-user"></i> Thông tin
          </div>
          <div
            class="border-bottom pl-2 pb-2 dropdown-item"
            @click="modalResetPassword = !modalResetPassword"
          >
            <i class="bx bx-key"></i> Đổi mật khẩu
          </div>
          <div class="pl-2 py-2 dropdown-item" @click="handleLogout">
            <i class="bx bx-power-off"></i> Thoát
          </div>
        </div>
      </div>
    </div>
    <modal-information
      @update="(v) => (modalInformation = v)"
      :value="modalInformation"
      :user="user"
    />
    <modal-reset-password
      @update="(v) => (modalResetPassword = v)"
      :value="modalResetPassword"
      :user="user"
    />
  </div>
</template>
<script>
import { eventBus } from "@/main";
import ModalInformation from "./partials/modal-information.vue";
import ModalResetPassword from "./partials/modal-reset-password.vue";
export default {
  name: "nav-bar-user",
  components: { ModalInformation, ModalResetPassword },
  data() {
    return {
      user: null,
      dropdown: false,
      menu: "",
      quantity: 0,
      entries: null,
      dropdownItem: false,
      window: {
        width: 0,
        height: 0,
      },
      openLogo: true,
      openMenu: false,
      modalInformation: false,
      modalResetPassword: false,
      resetPassword: {},
    };
  },
  watch: {
    $route: {
      handler() {
        this.menu = this.$route.name;
      },
      deep: true,
    },
    entries: {
      handler() {
        eventBus.$emit("entries-nav", this.entries);
      },
      deep: true,
    },
    modalInformation: {
      handler() {
        eventBus.$emit("checkModal", [this.modalInformation, this.modalResetPassword]);
      },
      deep: true,
    },
    modalResetPassword: {
      handler() {
        eventBus.$emit("checkModal", [this.modalResetPassword, this.modalInformation]);
      },
      deep: true,
    },
    window: {
      handler() {
        if (this.window.width >= 576) {
          this.openLogo = false;
        } else {
          this.openLogo = true;
        }
      },
      deep: true,
    },
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    checkName(value) {
      if (this.$route.name == value) return;
      this.$router.push({ name: value });
    },
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    },
    handleLogout() {
      this.$swal({
        title: "Thoát khỏi ứng dụng?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Không đồng ý",
        preConfirm: () => {
          localStorage.removeItem("user");
          localStorage.removeItem("products");
          this.$router.push({ name: "register-login" });
        },
      });
    },
    removeItem(item) {
      this.$swal({
        title: "Xoá khỏi giỏ hàng?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Không đồng ý",
        preConfirm: () => {
          const newEntries = this.entries.products.filter(
            (e) => e.product.id != item.product.id && e.product.name != item.product.name
          );
          this.entries.totalQuantity -= item.quantity;
          this.entries.totalProducts -= item.totalProduct;
          this.entries.products = newEntries;
          this.quantity = this.entries.totalQuantity;
          localStorage.setItem("products", JSON.stringify(this.entries));
          this.dropdownItem = false;
        },
      });
    },
    dropItem() {
      if (!this.entries || this.entries.products.length == 0) {
        this.$toast.warning("Hiện chưa có sản phẩm.", {
              position: "top-right",
              timeout: 3000,
            });
        return;
      }

      this.dropdownItem = !this.dropdownItem;
    },
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
    this.user = JSON.parse(localStorage.getItem("user"));
    this.quantity = JSON.parse(localStorage.getItem("products"))?.totalQuantity;
    this.entries = JSON.parse(localStorage.getItem("products"));
    this.menu = this.$route.name;
    eventBus.$on("entries", (value) => {
      (this.entries = value), (this.quantity = value.totalQuantity);
    });
  },
};
</script>
<style scoped>
.dropdown-list {
  position: absolute;
  background-color: white;
  border-radius: 3px;
  box-shadow: 1px 1px 13px 1px #aaa;
  top: 43px;
  right: 5px;
  width: 140px;
  animation: down 0.1s ease-in;
}
@keyframes down {
  from {
    top: 40px;
  }
  to {
    top: 43px;
  }
}
.dropdown-item:hover {
  background-color: rgb(248, 242, 242);
}
.cart {
  font-size: 34px;
  width: 51px;
  color: white;
  cursor: pointer;
  position: relative;
}
.bxs-cart:hover {
  color: orange;
  font-size: 38px;
}
.badge {
  position: absolute;
  /* width: 19px; */
  font-size: small;
  border-radius: 10px;
  right: -6px;
}
.nav-bar-user-wrapper {
  position: fixed;
  top: 0;
  height: 90px;
  width: 100%;
  padding: 0 40px;
  z-index: 10000;
  background-color: #e300e3;
}
.menu-item {
  cursor: pointer;
  display: inline-block;
  font-size: 20px;
  padding: 0 20px;
}
.menu-item:hover {
  text-decoration: underline;
  color: orange;
}
.active {
  color: #000;
  text-decoration: underline;
}
.logo-img {
  height: 73px;
  border-radius: 40px;
}
@media screen and (max-width: 992px) and (min-width: 768px) {
  .nav-bar-user-wrapper {
    padding: 0 20px;
  }
  .menu-item {
    font-size: 18px;
  }
}
@media screen and (max-width: 767px) and (min-width: 576px) {
  .logo-img {
    height: 50px;
    border-radius: 40px;
  }
  .nav-bar-user-wrapper {
    padding: 0 20px;
  }
  .menu-item {
    padding: 0 5px;
    font-size: 16px;
  }
}
@media screen and (max-width: 576px) {
  .logo-img {
    height: 50px;
    border-radius: 40px;
  }
  .nav-bar-user-wrapper {
    padding: 0 10px;
  }
  .menu-item {
    padding: 0 5px;
    font-size: 16px;
  }
  .bxs-cart {
    color: orange;
    font-size: 30px;
  }
  .bxs-cart:hover {
    color: orange;
    font-size: 34px;
  }
}
@media screen and (max-width: 767px) {
  .nav-bar-user-wrapper {
    height: 70px;
  }
}
@media screen and (max-width: 576px) {
  .nav-bar-user-wrapper {
    padding: 10px 5px;
    height: 50px;
  }
}
</style>

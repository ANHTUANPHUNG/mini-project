<template>
  <div class="side-bar-wrapper bg-white">
    <div v-if="menu" class="menu-title">
      <div
        class="cursor-pointer"
        v-for="item in listMenu"
        :key="item.title"
        @click="setActive(item)"
      >
        <div
          class="d-flex align-items-center menu-title-render"
          :class="item.active ? 'bg-light-ray' : 'bg-write'"
          @click="checkItem(item)"
        >
          <div
            :class="item.active ? 'menu-icon-active bg-purple' : 'menu-icon-active bg-write'"
          ></div>
          <div
            class="d-flex align-items-center ml-4 item-render"
            :class="item.active ? 'text-purple' : 'text-secondary'"
          >
            <i :class="item.icon" class="font-size-20 mr-2"></i>
            <span class="text-uppercase pr-5">{{ item.title }}</span>
            <i v-if="item.children && itemClick != item.title" class="bx bx-chevron-down pl-2"></i>
            <i v-if="item.children && itemClick == item.title" class="bx bx-chevron-up pl-2"></i>
          </div>
        </div>
        <div v-if="item.children && itemClick == item.title">
          <div v-for="i in item.children" :key="i.title" @click="setActiveChildren(item, i)">
            <div
              class="title pl-5 py-2"
              :class="i.active ? 'text-purple' : 'text-secondary'"
              style=""
            >
              {{ i.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="menu-icon" v-else>
      <div
        v-for="item in listMenu"
        :key="item.title"
        class="d-flex cursor-pointer menu-icon-render"
        @mouseleave="itemMouse = ''"
        @click="setActive(item)"
      >
        <div
          :class="item.active ? 'menu-icon-active bg-purple' : 'menu-icon-active bg-write'"
        ></div>
        <i
          @mouseover="itemMouse = item"
          :class="[
            item.icon === itemMouse.icon ? 'text-purple ' + item.icon : item.icon,
            item.active ? 'text-purple' : 'text-secondary',
          ]"
          class="font-size-24 icon"
        ></i>
        <div class="font-size-20 menu-icon-title" v-show="item.icon === itemMouse.icon">
          <span class="text-purple">
            {{ item.title }}
          </span>
          <div class="menu-icon-children-wrap">
            <div
              v-for="i in item?.children"
              :key="i.title"
              class="font-size-16 cursor-pointer pl-3 menu-icon-children"
              @click="setActiveChildren(item, i)"
            >
              <span class="title" :class="i.active ? 'text-purple' : 'text-secondary'">
                {{ i.title }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { eventBus } from "@/main";
import menu from "./data/menu.json";
export default {
  name: "side-bar",
  props:{
    value:Boolean
  },
  data() {
    return {
      listMenu: menu,
      menu: true,
      itemMouse: "",
      itemClick: "",
      isActive: "",
    };
  },
  watch: {
    menu:{
        handler(){
            this.$emit('update', this.menu)
        },
        deep:true
    },
    value:{
      handler(){
        this.menu = this.value
      },
      deep:true
    },
    $route: {
      handler(newValue, oldValue) {
        if (newValue != oldValue) {
          this.listMenu.forEach((element) => {
            if (element.children) {
              element.children.forEach((elementChildren) => {
                const result = newValue.path.slice(0, newValue.path.lastIndexOf("/"));
                if (elementChildren.to == result) {
                  element.active = true;
                  elementChildren.active = true;
                  this.itemClick = element.title;
                }
              });
            } else {
              if (element.to == newValue.path) {
                element.active = true;
              }
            }
          });
        }
      },
    },
  },
  methods: {
    setActive(value) {
      if (!value.children) {
        this.listMenu.forEach((item) => {
          item.active = false;
          if (item.children) {
            item.children.forEach((child) => {
              child.active = false;
            });
          }
        });
        this.listMenu.find((e) => e.title == value.title).active = true;
        if (this.$route.path != value.to) {
          this.$router.push({ path: value.to });
        }
        eventBus.$emit("menu", this.menu);
        this.menu = true;
        this.itemHover = "";
        this.itemClick = "";
        this.itemMouse = "";
      }
    },
    setActiveChildren(value, children) {
      if (value.children) {
        this.listMenu.forEach((item) => {
          item.active = false;
          if (item.children) {
            item.children.forEach((child) => {
              child.active = false;
            });
          }
        });
        const mainItem = this.listMenu.find((e) => e.title === value.title);
        if (mainItem) {
          mainItem.active = true;
        }
        this.listMenu.forEach((e) => {
          if (e.children) {
            const childItem = e.children.find((ele) => ele.title === children.title);
            if (childItem) {
              childItem.active = true;
            }
          }
        });
        if (this.$route.path.slice(0, this.$route.path.lastIndexOf("/")) != children.to) {
          this.$router.push({ path: children.to });
        }
        this.itemMouse = "";
        this.menu = true;
        this.itemHover = "";
      }
    },
    checkItem(value) {
      if (value.title == this.itemClick) {
        this.itemClick = "";
      } else {
        this.itemClick = value.title;
      }
    },
  },
  created() {
    this.menu= this.value
  },
};
</script>
<style scoped>
.menu-title {
  width: 250px;
}
.menu-title-render {
  padding: 10px 0;
}
.menu-title-render:hover {
  background-color: rgb(228, 219, 219);
}

.menu-icon {
  width: 70px;
}
.menu-icon-render {
  padding: 10px 0;
  position: relative;
}
.menu-icon-active {
  width: 5px;
  height: 40px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.icon {
  line-height: 40px;
  padding: 0 17px;
}
.icon:hover {
  color: #a709a7 !important;
}
.item-render:hover {
  color: #a709a7 !important;
}
.menu-icon-render:hover {
  background-color: rgb(228, 219, 219);
}
.title:hover {
  color: #a709a7 !important;
}
.menu-icon-title {
  position: absolute;
  top: 0;
  left: 70px;
  background-color: rgb(228, 219, 219);
  width: 180px;
  min-height: 60px;
  line-height: 55px;
}
.menu-icon-children {
  height: 40px;
  line-height: 36px;
}
.menu-icon-children:hover {
  color: #a709a7 !important;
}
.menu-icon-children-wrap {
  position: absolute;
  width: 180px;
  top: 60px;
  background-color: white;
  box-shadow: 1px 1px 13px 1px rgb(239 226 226);
}
.side-bar-wrapper {
  z-index: 900;
  padding-top: 20px;
}
</style>

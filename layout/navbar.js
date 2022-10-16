import Link from 'next/link'
import { slide as Menu } from 'react-burger-menu'
import { ImCross } from 'react-icons/im'
import { HiMenu } from 'react-icons/hi'
import Head from 'next/head'

export default function Navbar() {
  return (
    <>
      <Head>
        <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg" />
        <link rel="icon" type="image/png" href="/assets/favicon.png" />
      </Head>

      <div className="bg-primary">
        <div className="">
          <Menu
            pageWrapId={'page-wrap'}
            outerContainerId={'body'}
            right
            customCrossIcon={<ImCross className="text-primary" />}
            customBurgerIcon={<HiMenu className="text-white" />}
          >
            <Link href="/">
              <a className="bm-item text-primary">Home</a>
            </Link>
            <Link href="/map">
              <a className="bm-item text-primary">Map</a>
            </Link>
            <Link href="/list">
              <a className="bm-item text-primary">Places</a>
            </Link>
            <Link href="/submit">
              <a className="bm-item text-primary">Submit</a>
            </Link>
            <Link href="/contact">
              <a className="bm-item text-primary">Contact</a>
            </Link>
          </Menu>
        </div>
        <div id="page-wrap">
          <Link href="/">
            <a className="text-white normal-case text-2xl md:text-3xl px-0 m-1 md:m-4 float-left flex flex-row items-center justify-center">
              <svg
                width="50pt"
                height="50pt"
                version="1.1"
                viewBox="0 0 752 752"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <clipPath id="a">
                    <path d="m199 139.21h354v473.58h-354z" />
                  </clipPath>
                </defs>
                <g clipPath="url(#a)">
                  <path
                    d="m376.45 612.79c-9.3125 0-18.48-2.4766-26.527-7.1641-8.3945-4.2422-15.977-11.309-20.828-19.406-24.359-42.832-44.301-77.184-60.324-104.79-37.805-65.125-55.102-94.922-61.094-116.5-5.4922-16.531-8.2773-33.312-8.2773-49.891 0-45.176 18.559-89.965 50.918-122.89 33.562-34.141 78.441-52.945 126.37-52.945 47.301 0 91.559 18.199 124.63 51.242 33.07 33.051 51.285 77.297 51.285 124.59 0 14.875-2.25 31.109-6.8789 49.625-0.019531 0.078125-0.039062 0.16016-0.066406 0.23828-11.309 37.785-115.28 209.35-122.71 221.27l0.023438 0.015625c-9.6758 16.406-27.504 26.602-46.516 26.602zm0.23828-462.82c-91.82 0-166.52 74.051-166.52 165.07 0 15.461 2.6133 31.145 7.7695 46.617 0.027344 0.089844 0.054687 0.17969 0.082031 0.26953 5.5898 20.25 22.66 49.66 60.066 114.1 16.031 27.621 35.988 62 60.312 104.77 3.7383 6.2422 9.9336 11.996 16.508 15.289 0.10547 0.054688 0.21094 0.10938 0.31641 0.17188 6.4336 3.7773 13.773 5.7734 21.23 5.7734 15.223 0 29.496-8.1641 37.25-21.305 0.019531-0.027344 0.035156-0.058594 0.050781-0.085937 23.168-37.848 111.58-185.68 121.56-218.7 4.3906-17.598 6.5273-32.938 6.5273-46.891 0-92.562-72.547-165.07-165.15-165.07z"
                    fill="#fff"
                  />
                </g>
                <path
                  d="m376.7 456.92c-79.785 0-144.7-64.855-144.7-144.57 0-79.715 64.91-144.57 144.7-144.57 79.758 0 144.64 64.852 144.64 144.57 0 2.9727-2.4102 5.3828-5.3828 5.3828s-5.3828-2.4102-5.3828-5.3828c0-73.781-60.059-133.8-133.88-133.8-73.852 0-133.93 60.023-133.93 133.8 0 73.785 60.078 133.81 133.93 133.81 2.9727 0 5.3828 2.4102 5.3828 5.3828s-2.4062 5.3828-5.3789 5.3828z"
                  fill="#fff"
                />
                <path
                  d="m448.91 390.3h-0.007812-28.898c-1.0312 0-2.0078-0.4375-2.6914-1.207-0.6875-0.76562-1.0156-1.7852-0.89844-2.8086l2.8359-25.191 1.7812-29.34 1.4961-46.328v-0.10547l1.0938-18.059c0.11719-1.9062 1.6992-3.3945 3.6055-3.3945h14.449c1.9336 0 3.5234 1.5234 3.6055 3.457l3.1328 72.402h11.32c1.9922 0 3.6094 1.6172 3.6094 3.6133v14.449c0 1.9961-1.6172 3.6133-3.6094 3.6133l-9.8789 0.003906 2.6133 24.672c0.035156 0.19922 0.054687 0.40625 0.054687 0.61719 0 1.9883-1.6211 3.6055-3.6133 3.6055zm-24.863-7.2227h20.844l-2.6445-24.906c-0.10938-1.0156 0.22266-2.0352 0.90625-2.7969 0.6875-0.76172 1.6641-1.1953 2.6875-1.1953h10.289v-7.2266h-11.168c-1.9336 0-3.5273-1.5234-3.6055-3.457l-3.1367-72.402h-7.5898l-0.88672 14.617-1.4961 46.328c0 0.035156 0 0.070312-0.003907 0.10547l-1.7852 29.48c-0.003906 0.0625-0.007813 0.125-0.015625 0.1875z"
                  fill="#fff"
                />
                <path
                  d="m376.65 296.39c-9.8086 0-19.441-2.6992-28.629-8.0234-7.9219-4.5859-15.246-11.039-21.184-18.66-1.2266-1.5742-0.94531-3.8438 0.62891-5.0664 1.5742-1.2266 3.8438-0.94531 5.0703 0.62891 11.66 14.961 28.148 23.895 44.109 23.895 21.051 0 33.551-6.2656 47.758-23.938 1.25-1.5547 3.5195-1.8008 5.0781-0.55078 1.5547 1.25 1.8047 3.5234 0.55078 5.0781-15.605 19.414-30.074 26.637-53.383 26.637z"
                  fill="#fff"
                />
                <path
                  d="m463.34 289.71c-0.58203 0-1.1719-0.14062-1.7188-0.4375-8.5547-4.6406-16.441-11.406-22.801-19.57-1.2266-1.5742-0.94531-3.8438 0.62891-5.0664 1.5742-1.2266 3.8438-0.94531 5.0703 0.62891 5.7539 7.3828 12.855 13.488 20.547 17.652 1.7539 0.94922 2.4062 3.1445 1.4531 4.8984-0.65234 1.2109-1.8945 1.8945-3.1797 1.8945z"
                  fill="#fff"
                />
                <path
                  d="m293.57 289.71c-1.2852 0-2.5273-0.68359-3.1797-1.8906-0.95312-1.75-0.30078-3.9453 1.4531-4.8984 7.6875-4.168 14.793-10.273 20.547-17.652 1.2266-1.5742 3.5-1.8555 5.0703-0.62891 1.5742 1.2266 1.8555 3.4961 0.62891 5.0664-6.3633 8.1641-14.246 14.93-22.805 19.57-0.54297 0.29297-1.1367 0.43359-1.7148 0.43359z"
                  fill="#fff"
                />
                <path
                  d="m336.91 390.3h-28.898c-1.0234 0-2.0039-0.43359-2.6875-1.1953-0.6875-0.76172-1.0156-1.7773-0.91016-2.7969l2.6445-24.906h-9.8867c-1.9922 0-3.6094-1.6172-3.6094-3.6133v-14.449c0-1.9961 1.6172-3.6133 3.6094-3.6133h11.32l3.1328-72.402c0.085938-1.9336 1.6758-3.457 3.6094-3.457h14.449c1.9102 0 3.4883 1.4883 3.6055 3.3945l1.0977 18.059c0.003906 0.035156 0.003906 0.070312 0.003906 0.10547l1.4062 44.832 1.8711 30.832 2.8359 25.191c0.11719 1.0234-0.21094 2.0469-0.89844 2.8086-0.6875 0.77344-1.6641 1.2109-2.6953 1.2109zm-24.883-7.2227h20.84l-2.3984-21.27c-0.003906-0.0625-0.011718-0.125-0.011718-0.1875l-1.8789-30.977c0-0.035157-0.003906-0.070313-0.003906-0.10547l-1.4062-44.832-0.88672-14.613h-7.5898l-3.1367 72.402c-0.082032 1.9336-1.6758 3.457-3.6055 3.457h-11.168v7.2266h10.289c1.0234 0 2 0.4375 2.6836 1.1953 0.68359 0.76172 1.0156 1.7773 0.90625 2.7969z"
                  fill="#fff"
                />
                <path
                  d="m459.74 361.41h-162.56c-1.9922 0-3.6094-1.6172-3.6094-3.6133v-14.449c0-1.9961 1.6172-3.6133 3.6094-3.6133h162.56c1.9922 0 3.6094 1.6172 3.6094 3.6133v14.449c0 1.9961-1.6172 3.6133-3.6094 3.6133zm-158.95-7.2227h155.33v-7.2266h-155.33z"
                  fill="#fff"
                />
                <path
                  d="m409.16 321.67c-1.9922 0-3.6094-1.6172-3.6094-3.6133v-32.512c0-1.9961 1.6172-3.6094 3.6094-3.6094 1.9961 0 3.6133 1.6172 3.6133 3.6094v32.512c0 1.9961-1.6172 3.6133-3.6133 3.6133z"
                  fill="#fff"
                />
                <path
                  d="m394.71 325.28c-1.9961 0-3.6133-1.6172-3.6133-3.6133v-28.898c0-1.9961 1.6172-3.6133 3.6133-3.6133s3.6133 1.6172 3.6133 3.6133v28.898c0 1.9961-1.6211 3.6133-3.6133 3.6133z"
                  fill="#fff"
                />
                <path
                  d="m380.26 332.51c-1.9922 0-3.6094-1.6172-3.6094-3.6133v-36.125c0-1.9961 1.6172-3.6133 3.6094-3.6133 1.9961 0 3.6133 1.6172 3.6133 3.6133v36.125c0 1.9961-1.6172 3.6133-3.6133 3.6133z"
                  fill="#fff"
                />
                <path
                  d="m365.82 325.28c-1.9961 0-3.6133-1.6172-3.6133-3.6133v-28.898c0-1.9961 1.6172-3.6133 3.6133-3.6133s3.6133 1.6172 3.6133 3.6133v28.898c-0.003907 1.9961-1.6211 3.6133-3.6133 3.6133z"
                  fill="#fff"
                />
                <path
                  d="m351.37 321.67c-1.9961 0-3.6133-1.6172-3.6133-3.6133v-28.898c0-1.9961 1.6172-3.6133 3.6133-3.6133 1.9922 0 3.6133 1.6172 3.6133 3.6133v28.898c-0.003907 1.9961-1.6211 3.6133-3.6133 3.6133z"
                  fill="#fff"
                />
                <path
                  d="m434.45 271.1c-1.9922 0-3.6094-1.6172-3.6094-3.6133v-10.84c0-1.9961 1.6172-3.6094 3.6094-3.6094 1.9961 0 3.6133 1.6172 3.6133 3.6094v10.84c0 1.9961-1.6172 3.6133-3.6133 3.6133z"
                  fill="#fff"
                />
                <path
                  d="m322.46 271.1c-1.9922 0-3.6133-1.6172-3.6133-3.6133v-10.84c0-1.9961 1.6172-3.6094 3.6133-3.6094s3.6094 1.6172 3.6094 3.6094v10.84c0.003906 1.9961-1.6133 3.6133-3.6094 3.6133z"
                  fill="#fff"
                />
                <path
                  d="m367.62 260.26h-10.84c-4.3594 0-8.0078-3.1094-8.8477-7.2227l-5.6055-0.003906c-4.9766 0-9.0312-4.0508-9.0312-9.0312 0-4.9766 4.0508-9.0312 9.0312-9.0312h10.84c4.3594 0 8.0117 3.1094 8.8477 7.2266h5.6016c4.9805 0 9.0312 4.0508 9.0312 9.0312 0 4.9766-4.0508 9.0312-9.0273 9.0312zm-25.293-18.062c-0.99609 0-1.8086 0.80859-1.8086 1.8047s0.8125 1.8086 1.8086 1.8086h9.3477c1.1719 0 2.2734 0.56641 2.9531 1.5273 0.67578 0.95703 0.84375 2.1875 0.45313 3.293-0.070313 0.20313-0.10547 0.40234-0.10547 0.59766 0 0.99609 0.8125 1.8086 1.8047 1.8086h10.84c0.99219 0 1.8047-0.8125 1.8047-1.8086 0-0.99609-0.8125-1.8047-1.8047-1.8047h-9.3477c-1.1719 0-2.2734-0.57031-2.9492-1.5273-0.67969-0.96094-0.84766-2.1875-0.45703-3.293 0.070312-0.20312 0.10938-0.40234 0.10938-0.60156 0-0.99609-0.80859-1.8047-1.8047-1.8047z"
                  fill="#fff"
                />
              </svg>
              Wailuku Walking Tour
            </a>
          </Link>
        </div>
      </div>
    </>
  )
}

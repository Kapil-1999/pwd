export const ADMIN_MENU = [
    {
      id: 1,
      name: "Home",
      path: "/admin/dashboard/home",
      iconClass: "assets/images/house.png",
      
    },
    {
      id: 2,
      name: "Live Track",
      path: "/admin/live/track",
      iconClass: "assets/images/location.png",
    },
    {
      id: 3,
      name: "History Playback",
      path: "/user/history/play-back",
      iconClass: "assets/images/road-map.png",
    },
    {
      id: 4,
      name: "Masters",
      path: "",
      iconClass: "assets/images/master-data.png",
      isOpen: false,
      subNav: [
        {
          id: 110,
          name: "Department Master",
          path: "/admin/master/department-master",
          iconClass: "fa fa-pencil",
        },
        {
          id: 111,
          name: "Designation Master",
          path: "/admin/master/designation-master",
          iconClass: "fa fa-pencil",
        },
        {
          id: 104,
          name: "User Master",
          path: "/admin/master/user-master",
          iconClass: "fa fa-pencil",
        },
        {
          id: 103,
          name: "Zone Master",
          path: "/admin/master/zone-master",
          iconClass: "fa fa-pencil",
        },
        {
          id: 1,
          name: 'Circle Master',
          path: "/admin/master/circle-master",
          iconClass: "fa fa-pencil",
        },
        {
          id: 2,
          name: 'District Entry',
          path: "/admin/master/district-master",
          iconClass: "fa fa-pencil",
        },
        {
          id: 3,
          name: 'Division Entry',
          path: "/admin/master/division-master",
          iconClass: "fa fa-pencil",
        },
        {
          id: 7,
          name: 'Category Master',
          path: "/admin/master/category-master",
          iconClass: "fa fa-pencil",
        },
        {
          id: 8,
          name: 'Sub Category Master',
          path: "/admin/master/subcategory-master",
          iconClass: "fa fa-pencil",
        },
        {
          id: 9,
          name: 'Area Master',
          path: "/user/reports/vehicle-report/Temperature-Report",
          iconClass: "fa fa-pencil",
        },
        {
          id: 10,
          name: 'Work Master',
          path: "/user/reports/vehicle-report/Alert-Report",
          iconClass: "fa fa-pencil",
        },
        {
          id: 14,
          name: 'Member Master',
          path: "/user/reports/vehicle-report/Alert-Report",
          iconClass: "fa fa-pencil",
        }
      ]
    },
    {
      id: 5,
      name: "Allocation",
      path: "",
      iconClass: "/assets/images/resource.png",
      isOpen: false,
      subNav: [
        {
          id: 103,
          name: "POI Allocation",
          path: "/user/manage/vehicles",
          iconClass: "fa fa-address-book",
        },
        {
          id: 1,
          name: 'Duty Allocation',
          path: "/user/reports/vehicle-report/Distance",
          iconClass: "fa fa-address-book",
        }
      ]
    },
    {
      id: 6,
      name: "Report",
      path: "user/geofacne/list-geofence",
      iconClass: "assets/images/report.png",
      isOpen: false,
      subNav: [
        {
          id: 103,
          name: "District Report",
          path: "/user/manage/vehicles",
          iconClass: "fa fa-bars",
        },
        {
          id: 1,
          name: 'General Report',
          path: "/user/reports/vehicle-report/Distance",
          iconClass: "fa fa-bars",
        },
        {
          id: 1,
          name: 'Attendance Report',
          path: "/user/reports/vehicle-report/Distance",
          iconClass: "fa fa-bars",
        },
        {
          id: 1,
          name: 'View Report',
          path: "/user/reports/vehicle-report/Distance",
          iconClass: "fa fa-bars",
        },
        {
          id: 1,
          name: 'Area Activity',
          path: "/user/reports/vehicle-report/Distance",
          iconClass: "fa fa-bars",
        }
      ]
    },
  ];

export const IMG_URL = 'http://103.109.7.173:7604/'
  
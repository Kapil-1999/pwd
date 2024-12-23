export const menu = [
    {
      id: 1,
      name: "Home",
      path: "/admin/admin-home/home",
      iconClass: "fa fa-home",
      
    },
    {
      id: 2,
      name: "Live Track",
      path: "",
      iconClass: "fa fa-map",
    },
    {
      id: 3,
      name: "History Playback",
      path: "/user/history/play-back",
      iconClass: "fa fa-history",
    },
    {
      id: 4,
      name: "Masters",
      path: "",
      iconClass: "fa fa-file",
      isOpen: false,
      subNav: [
        {
          id: 103,
          name: "Zone Master",
          path: "/user/reports/general-report",
          iconClass: "fa fa-pencil",
        },
        {
          id: 1,
          name: 'Circle Master',
          path: "/user/reports/vehicle-report/Distance",
          iconClass: "fa fa-pencil",
        },
        {
          id: 2,
          name: 'District Entry',
          path: "/user/reports/vehicle-report/Stop",
          iconClass: "fa fa-pencil",
        },
        {
          id: 3,
          name: 'Division Entry',
          path: "/user/reports/vehicle-report/Idle",
          iconClass: "fa fa-pencil",
        },
        {
          id: 4,
          name: 'Master Entry',
          path: "/user/reports/vehicle-report/Trip-Report",
          iconClass: "fa fa-pencil",
        },
        {
          id: 5,
          name: 'Chief Engineer Master',
          path: "/user/reports/vehicle-report/Speed-Report",
          iconClass: "fa fa-pencil",
        },
        {
          id: 6,
          name: 'Supritending Engineer Master',
          path: "/user/reports/vehicle-report/GeoFence-Report",
          iconClass: "fa fa-pencil",
        },
        {
          id: 7,
          name: 'Category Master',
          path: "/user/reports/vehicle-report/Duration-Report",
          iconClass: "fa fa-pencil",
        },
        {
          id: 8,
          name: 'Sub Category Master',
          path: "/user/reports/vehicle-report/AC-Report",
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
          id: 11,
          name: 'Ex. Engineer Master',
          path: "/user/reports/vehicle-report/Alert-Report",
          iconClass: "fa fa-pencil",
        },
        {
          id: 12,
          name: 'AE Master',
          path: "/user/reports/vehicle-report/Alert-Report",
          iconClass: "fa fa-pencil",
        },
        {
          id: 13,
          name: 'JE Master',
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
      iconClass: "fa fa-tasks",
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
      iconClass: "fa fa-file-text",
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
  
import React, { useEffect, useState, useContext } from "react";
import { Card } from "react-bootstrap";
import { AuthContext } from "../../../../context/AuthContext";
import axiosInstance from "../../../../services/api";
import { TASKS_URLS, USER_URLS } from "../../../../services/api/apiURLs";
import { LuChartNoAxesCombined } from "react-icons/lu";
import { GoChecklist } from "react-icons/go";
import { TbBusinessplan } from "react-icons/tb";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from "chartjs-plugin-datalabels";
import styles from "./Dashboard.module.css"
import ChatBot from "../../../Shared/components/ChatPot/ChatPot";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);
export default function Dashboard() {
 
  const { userData } = useContext(AuthContext);
  const [counts, setCounts] = useState({
    toDo: 0,
    inProgress: 0,
    done: 0,
  });
   const [countsUser, setCountsUser] = useState({
    activatedEmployeeCount: 0,
  deactivatedEmployeeCount: 0
  });

  const getTaskssCount = async () => {
    try {
      const response = await axiosInstance.get(TASKS_URLS.CONUT_TASKS_FOR_MANAGER_EMPLOYEE, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCounts(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getUsersCount = async () => {
    try {
      const response = await axiosInstance.get(USER_URLS.GET_USERS_COUNT_BY_MANAGER, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCountsUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const donutColors = {
  progress: "rgba(240, 245, 160,1)",
  tasks: "rgb(159, 161, 216)",
  projects: "rgb(240, 196, 204)",
};
  const donutUserColors = {
  activatedEmployeeCount: "rgba(112, 212, 142, 0.8)",
  deactivatedEmployeeCount: "rgba(207, 99, 91, 0.8)",
};
const donutUserData = {
  labels: ["Activate", "Inactivate"],
  datasets: [
    {
      data: [ countsUser.activatedEmployeeCount,
        countsUser.deactivatedEmployeeCount],
        backgroundColor: [
        donutUserColors.activatedEmployeeCount,
        donutUserColors.deactivatedEmployeeCount,
        
      ],
      borderWidth: 0,
    },
  ],
};
const donutData = {
  labels: ["InProgress", "To Do", "Done"],
  datasets: [
    {
      data: [ counts.inProgress,
        counts.toDo,
        counts.done],
        backgroundColor: [
        donutColors.progress,
        donutColors.tasks,
        donutColors.projects,
      ],
      borderWidth: 0,
    },
  ],
};
const donutOptions = {
  cutout: "35%",
  plugins: {
    legend: {
      display: true,
    },
    datalabels: {
      color: "rgba(255, 248, 248, 1)",
      font: {
        weight: "bold",
        size: 15,
      },
      formatter: (value, context) => {
        if (value === 0) return "";
        const data = context.chart.data.datasets[0].data;
        const total = data.reduce((a, b) => a + b, 0);
        const percentage = ((value / total) * 100).toFixed(0);
        return `${percentage}%`;
      },
    },
  },
};


  useEffect(() => {
    getTaskssCount()
    getUsersCount();
  }, []);

  return (
    <>
      
      <div className={`${styles.homeImage} d-flex flex-column justify-content-center p-4`}>
        <h3 className="text-white">
          Welcome <span className="textHeader fw-bold">{userData?.userName}</span>
        </h3>
        <p className="text-white fs-2">
          You can add project and assign tasks to your team
        </p>
      </div>
      <div className={`${styles.dashboard_cards_wrapper} container-fluid`}>
        <div className="row g-5 ">
          <div className={`${
            userData?.userGroup === "Manager"
            ? "col-12 col-md-12 col-lg-6": "col-12"}`}>
            <div className="row">
              <Card className={`${styles.tasks_summary_card }  bgOverlayDark pt-3`}>
                <Card.Body>
                  <div className={styles.cardPad}>
                    <h5 className="textDark mb-2 p-2">Tasks</h5>
                  </div>
                  <p className="subTitleText mb-4 p-2">
                    Lorem ipsum dolor sit amet, consectetur
                  </p>

                  <div className={`${styles.inner_cards_wrapper} `}>

                    <div className={`${styles.stat_card} ${styles.tasksNumber}` }>
                      <div className={`${styles.todo} ${styles.icon_box}`}>
                        <GoChecklist />
                      </div>
                      <p className="mb-1 text-muted">To Do</p>
                      <h5 className="ms-1">{counts.toDo}</h5>
                    </div>

                    <div className={`${styles.stat_card} ${styles.progressUser}`}>
                      <div className={`${styles.icon_box} ${styles.icon_box_inprogress}`}>
                        <LuChartNoAxesCombined />
                      </div>
                      <p className="mb-1 text-muted">InProgress</p>
                      <h5 className="ms-1">{counts.inProgress}</h5>
                    </div>

                    <div className={`${styles.stat_card} ${styles.projectNumber}`}>
                      <div className={`${styles.done} ${styles.icon_box}`}>
                        <TbBusinessplan />
                      </div>
                      <p className="mb-1 text-muted">Done</p>
                      <h5 className="ms-1">{counts.done}</h5>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>

            <div className={`${
              userData?.userGroup != "Manager"
                ? "row" : "" }`}>
              <div className={`${styles.tasks_donut_wrapper} bgOverlayDark`}>
                <div className={styles.donut_wrapper}>
                  <Doughnut data={donutData} options={donutOptions} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-12 col-lg-6">
            <div className="row">
              {userData?.userGroup == "Manager"?
              <div className="row">
                <div className="col-12 col-md-12 col-lg-6">
                  <Card  className={`${styles.tasks_summary_card} h-100 bgOverlayDark pt-3`}>
                    <Card.Body>
                      <div className={styles.cardPad}>
                        <h5 className="textDark  mb-2 p-2">Users</h5>
                        </div>
                        <p className="subTitleText mb-4 p-2">
                          Lorem ipsum dolor sit amet, consectetur
                        </p>
                      
                        <div className={`${styles.inner_cards_wrapper} py-2`}>
                          <div className={`${styles.activeuser} ${styles.stat_card}`}>
                            <div className={`${styles.icon_box} ${styles.icon_box_activeuser}`}>
                              <LuChartNoAxesCombined />
                            </div>
                            <p className="mb-1 text-muted">Active</p>
                            <h5 className="ms-1">{countsUser.activatedEmployeeCount}</h5>
                          </div>

                          <div className={`${styles.stat_card} ${styles.Inactiveuser}`}>
                            <div className={`${styles.icon_box} ${styles.icon_box_Inactiveuser}`}>
                              <GoChecklist />
                            </div>
                            <p className="mb-1 text-muted">Inactive</p>
                            <h5 className="ms-1">{countsUser.deactivatedEmployeeCount}</h5>
                          </div>
                        </div>
                    </Card.Body>
                  </Card>
                    
                </div>
              </div>
              :""}
            </div>
            <div className="row">
              {userData?.userGroup === "Manager" && (
              <div className={`${styles.tasks_donut_wrapper} bgOverlayDark`}>
                <div className={styles.donut_wrapper}>
                  <Doughnut data={donutUserData} options={donutOptions} />
                </div>
              </div>
            )}
            </div>
                  
          </div>
        </div>
      
      </div>
  


<div className="d-flex justify-content-end">
  <ChatBot/>
</div>
</>
  )
}

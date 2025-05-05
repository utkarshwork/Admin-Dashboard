"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/layout/admin-layout/AdminLayout";
import { Box } from "@mui/material";
import PlaylistAddCheckCircleIcon from "@mui/icons-material/PlaylistAddCheckCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import { PieChart } from "@mui/x-charts/PieChart";
import StickyTable from "@/components/DashboardTable";
import {
  StyledCorner,
  StyledCountBox,
  StyledDashboardBox,
  StyledIconBox,
  StyledIconBoxCount,
  StyledIconBoxTitle,
  StyledleadBox,
  StyledLeftBox,
  StyledleftBoxTitle,
  StyledPieBox,
  StyledRightBox,
} from "./style";
import { useTheme } from "@mui/material/styles";
import GradientCircularProgress from "@/components/layout/loader/GradientCircularProgress";
import Loader from "@/components/layout/loader/Loader";

export default function DashboardPage() {
  const [participants, setParticipants] = useState<number | null>(null);
  const [surveys, setSurveys] = useState<number | null>(null);
  const [subscribers, setSubscribers] = useState<number | null>(null);
  const [isParticipantsLoading, setIsParticipantsLoading] =
    useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSurveysLoading, setIsSurveysLoading] = useState<boolean>(true);
  const [isSubscribersLoading, setIsSubscribersLoading] =
    useState<boolean>(true);
  const [isChartLoading, setIsChartLoading] = useState<boolean>(true);
  const [totalPins, setTotalPins] = useState<number | null>(null);
  const [availablePins, setAvailablePins] = useState<number | null>(null);
  const [allotedPins, setAllotedPins] = useState<number | null>(null);
  useEffect(() => {
    const fetchPinCounts = async () => {
      try {
        const totalPins = 10;
        const availablePins = 10;
        const allottedPins = 20;
        setTotalPins(totalPins);
        setAvailablePins(availablePins);
        setAllotedPins(allottedPins);
      } catch (error) {
        console.error("Failed to fetch pin counts", error);
      }
    };
    fetchPinCounts();
  }, [totalPins]);
  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        const participantsRes = 10;
        setParticipants(participantsRes ?? 0);
        setIsParticipantsLoading(false);

        const surveysRes = 20;
        setSurveys(surveysRes ?? 0);
        setIsSurveysLoading(false);

        const subscribersRes = 30;
        setSubscribers(subscribersRes ?? 0);
        setIsSubscribersLoading(false);
        setIsChartLoading(false);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [surveys]);
  const statCards = [
    {
      title: "Participants",
      count: participants,
      icon: SupervisedUserCircleIcon,
      bg: "linear-gradient(90deg, #cdd1ff 2.14%, #d0a4fb 100%)",
    },
    {
      title: "Surveys",
      count: surveys,
      icon: PlaylistAddCheckCircleIcon,
      bg: "linear-gradient(90deg, #ffcaed 2.8%, #c69bff 100%)",
    },
    {
      title: "Subscribers",
      count: subscribers,
      icon: CheckCircleIcon,
      bg: "linear-gradient(90deg, #AACFFF 0%, #c89dfe 104.77%)",
    },
  ];

  const theme = useTheme();

  const pieData = [
    {
      id: 0,
      value: totalPins ?? 0,
      label: "Total Pins",
      color: theme.palette.survey.participantsColor,
    },
    {
      id: 1,
      value: availablePins ?? 0,
      label: "Available",
      color: theme.palette.survey.surveysColor,
    },
    {
      id: 2,
      value: allotedPins ?? 0,
      label: "Alloted",
      color: theme.palette.survey.subscribersColor,
    },
  ];

  return (
    <AdminLayout>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <StyledDashboardBox>
            {statCards.map((card, index) => {
              const Icon = card.icon;
              const isLoading =
                (card.title === "Participants" && isParticipantsLoading) ||
                (card.title === "Surveys" && isSurveysLoading) ||
                (card.title === "Subscribers" && isSubscribersLoading);
              return (
                <StyledIconBox key={index} bg={card.bg}>
                  {isLoading ? (
                    <GradientCircularProgress />
                  ) : (
                    <Icon
                      sx={{
                        fontSize: 200,
                        color: "#ffffff4d",
                        position: "absolute",
                        right: "-30px",
                        top: 0,
                        borderRadius: "100px",
                      }}
                    />
                  )}
                  <StyledIconBoxTitle>{card.title}</StyledIconBoxTitle>
                  <StyledCountBox>
                    {isLoading ? (
                      <Box
                        sx={{
                          width: "60%",
                          height: 20,
                          backgroundColor: "#e0e0e0",
                          borderRadius: 1,
                        }}
                      />
                    ) : (
                      <StyledIconBoxCount>{card.count}</StyledIconBoxCount>
                    )}
                    <StyledCorner></StyledCorner>
                  </StyledCountBox>
                </StyledIconBox>
              );
            })}
          </StyledDashboardBox>

          <StyledleadBox>
            <StyledLeftBox>
              <StyledleftBoxTitle variant="h6" fontWeight="bold">
                Pin Chart
              </StyledleftBoxTitle>
              <StyledPieBox>
                {isChartLoading ? (
                  <GradientCircularProgress />
                ) : (
                  <PieChart
                    series={[
                      {
                        data: pieData,
                        innerRadius: 60,
                        outerRadius: 100,
                        paddingAngle: 2,
                        cornerRadius: 0,
                      },
                    ]}
                    width={300}
                    height={250}
                    sx={{
                      flexDirection: "column-reverse",
                      ["& .css-1jazj0d-MuiChartsLegend-root"]: {
                        flexDirection: "row",
                      },
                    }}
                  />
                )}
              </StyledPieBox>
            </StyledLeftBox>

            <StyledRightBox>
              <StickyTable />
            </StyledRightBox>
          </StyledleadBox>
        </>
      )}
    </AdminLayout>
  );
}

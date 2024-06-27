import { faker } from '@faker-js/faker';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

import AppTasks from '../app-tasks';
import AppNewsUpdate from '../app-news-update';
import AppOrderTimeline from '../app-order-timeline';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppTrafficBySite from '../app-traffic-by-site';
import AppCurrentSubject from '../app-current-subject';
import AppConversionRates from '../app-conversion-rates';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { CircularProgress, Skeleton } from '@mui/material';

// ----------------------------------------------------------------------

export default function AppView() {

  const [counts, setCounts] = useState();

  async function fetchCounts() {
    await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/y/fleets/getfleetcounts`).then((res) => {
      // console.log(res.data);
      setCounts(res.data);
    })
      .catch((err) => {
        setCounts("error");
      })
  }

  useEffect(() => {
    fetchCounts();
  }, [])

  return (
    <>
      {!counts ?
        <div className='flex justify-start items-center flex-col gap-2 w-full h-screen py-4'>

          <Skeleton variant="rectangular" className='w-full rounded-lg h-2/5' style={{ height: "calc(40vh - 5rem)" }} />
          <Skeleton variant="rectangular" className='w-full rounded-lg' style={{ height: "calc(60vh - 5rem)" }} />
          {/* <Skeleton variant="rectangular" className='w-full rounded-lg' height={118} /> */}
        </div>
        :
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ mb: 5 }}>
            Hi, Welcome to Fetron 👋
          </Typography>


          <div className='w-full h-full flex flex-col justify-start items-start gap-4'>
            <div className='w-full h-fit flex flex-col rounded-lg bg-slate-100 gap-1 py-1'>
              <div className='w-full h-fit flex justify-start items-center gap-1 p-1 py-0'>

                {counts && counts != "error" &&
                  counts.data.map((el, i) => {
                    return (
                      <>
                        {i < 3 ?
                          < div className='w-full h-24 bg-white border-1 border-slate-300 rounded-lg flex flex-col justify-center items-start gap-2 pl-4' >
                            <p className='text-lg font-bold'>{el.field}</p>
                            <p className='text-2xl text-red-800 text-semibold'>{el.count}</p>
                          </div>
                          : <></>
                        }
                      </>

                    )
                  })

                }

              </div>
              <div className='w-full h-fit flex justify-start items-center gap-1 p-1 py-0'>

                {counts && counts != "error" &&
                  counts.data.map((el, i) => {
                    return (
                      <>
                        {i > 2 && i < 6 ?
                          < div className='w-full h-24 bg-white border-1 border-slate-300 rounded-lg flex flex-col justify-center items-start gap-2 pl-4 ' >
                            <p className='text-lg font-bold'>{el.field}</p>
                            <p className='text-2xl text-red-800 text-semibold'>{el.count}</p>
                          </div>
                          : <></>
                        }
                      </>

                    )
                  })

                }

              </div>
              <div className='w-full h-fit flex justify-start items-center gap-1 p-1 py-0'>

                {counts && counts != "error" &&
                  counts.data.map((el, i) => {
                    return (
                      <>
                        {i > 5 ?
                          < div className='w-full h-24 bg-white border-1 border-slate-300 rounded-lg flex flex-col justify-center items-start gap-2 pl-4 ' >
                            <p className='text-lg font-bold'>{el.field}</p>
                            <p className='text-2xl text-red-800 text-semibold'>{el.count}</p>
                          </div>
                          : <></>
                        }
                      </>

                    )
                  })

                }

              </div>
            </div>
            {/* <Grid xs={12} md={6} lg={4}> */}
            {counts && counts != "error" &&
              <AppCurrentVisits
                title="Current Visits"
                className="w-full bg-transparent"
                chart={{
                  series: [
                    { label: 'Available', value: counts.obj.available },
                    { label: 'EnrouteForPickup', value: counts.obj.enrouteForPickup },
                    { label: 'AtPickup', value: counts.obj.atPickup },
                    { label: 'InTransit', value: counts.obj.inTransit },
                    { label: 'Unloading', value: counts.obj.unloading },
                    { label: 'Completed', value: counts.obj.completed },
                  ],
                }}
              />
            }

            {/* </Grid> */}
          </div>
          {/* <Grid container spacing={3}> */}


          {/*   <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="All vechiles"
            total={counts.all}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>



        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="New Users"
            total={1352831}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Item Orders"
            total={1723315}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Bug Reports"
            total={234}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Website Visits"
            subheader="(+43%) than last year"
            chart={{
              labels: [
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ],
              series: [
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ],
            }}
          />
        </Grid> */}
          {/* Pie Chart */}
          {/* <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Current Visits"
            chart={{
              series: [
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ],
            }}
          />
        </Grid> */}

          {/* <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Conversion Rates"
            subheader="(+43%) than last year"
            chart={{
              series: [
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ],
            }}
          />
        </Grid> */}

          {/* <Grid xs={12} md={6} lg={4}>
          <AppCurrentSubject
            title="Current Subject"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid> */}

          {/* <Grid xs={12} md={6} lg={8}>
          <AppNewsUpdate
            title="News Update"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: faker.person.jobTitle(),
              description: faker.commerce.productDescription(),
              image: `/assets/images/covers/cover_${index + 1}.jpg`,
              postedAt: faker.date.recent(),
            }))}
          />
        </Grid> */}

          {/* <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="Order Timeline"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                '1983, orders, $4220',
                '12 Invoices have been paid',
                'Order #37745 from September',
                'New order placed #XF-2356',
                'New order placed #XF-2346',
              ][index],
              type: `order${index + 1}`,
              time: faker.date.past(),
            }))}
          />
        </Grid> */}

          {/* <Grid xs={12} md={6} lg={4}>
          <AppTrafficBySite
            title="Traffic by Site"
            list={[
              {
                name: 'FaceBook',
                value: 323234,
                icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />,
              },
              {
                name: 'Google',
                value: 341212,
                icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />,
              },
              {
                name: 'Linkedin',
                value: 411213,
                icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />,
              },
              {
                name: 'Twitter',
                value: 443232,
                icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />,
              },
            ]}
          />
        </Grid> */}

          {/* <Grid xs={12} md={6} lg={8}>
          <AppTasks
            title="Tasks"
            list={[
              { id: '1', name: 'Create FireStone Logo' },
              { id: '2', name: 'Add SCSS and JS files if required' },
              { id: '3', name: 'Stakeholder Meeting' },
              { id: '4', name: 'Scoping & Estimations' },
              { id: '5', name: 'Sprint Showcase' },
            ]}
          />
        </Grid> */}
          {/* </Grid> */}
        </Container >
      }
    </>

  );
}

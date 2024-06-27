import { Helmet } from 'react-helmet-async';

import { FleetReportView } from 'src/sections/report/view';

// ----------------------------------------------------------------------

export default function FleetReportPage() {
    return (
        <>
            <Helmet>
                <title>Fleet Report </title>
            </Helmet>

            <FleetReportView />
        </>
    );
}

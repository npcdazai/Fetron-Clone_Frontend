import { Helmet } from 'react-helmet-async';

import { MasterVehicleView } from 'src/sections/masterVehicle/view';

// ----------------------------------------------------------------------

export default function FleetPage() {
    return (
        <>
            <Helmet>
                <title> Master Vehicle </title>
            </Helmet>

            <MasterVehicleView />
        </>
    );
}

interface DashboardCardProps {
    title: string;
    count: number;
}

export default function DashboardCard(props: DashboardCardProps) {

    const { title, count } = props;
    return (
            <div className="card border-left-secondary shadow h-100 py-2">
                <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1 text-center">
                                {title}
                            </div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800 text-center"> {count}</div>
                        </div>
                        <div className="col-auto">
                            <i className="fas fa-calendar fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
    );
}
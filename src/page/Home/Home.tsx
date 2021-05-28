import React, { useContext, useEffect, useRef, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { ITodoContextType } from '../../contexts/Todo/ITodoContextType';
import { TodoContext } from '../../contexts/Todo/TodoContext';
import IPaginationData from '../../models/Pagination/IPaginationData.interface';
import Service from '../../models/Service.model';
import Todo from '../../models/Todo/Todo.model';
import { TodoStatusEnum } from '../../models/Todo/TodoStatusEnum';

interface AreaChartServiceGain {
    month: string;
    valor: number;
}

interface AreaChartServiceDone {
    service: string;
    quantidade: number;
}

interface ChartData {
    labels: string[];
    datasets: any[];
}

function Home() {
    const backgroundColor = [
        'rgb(0,0,0,0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
    ];
    const borderColor = [
        'rgb(0,0,0,1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
    ];
    const mountsPt = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const cssDivChartDefault: React.CSSProperties = {
        width: '100%',
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
    }

    const cssTitleChart: React.CSSProperties = {
        display: 'flex',
    }

    const optionsChart = {
        responsive: true,
        scales: { y: { beginAtZero: true } }
    }

    const ref = useRef();
    const [chartServiceFinalizado, setChartServiceFinalizado] = useState<ChartData>(null);
    const [chartServiceTop10, setChartServiceTop10] = useState<ChartData>(null);
    const todoContext = useContext<ITodoContextType>(TodoContext);
    const [todos] = useState<IPaginationData>(todoContext.getList({ totalCount: 0, page: 0, pageSize: -1, order: 'asc' }));
    const semDadosMensagem = "Sem dados para apresentação.";

    const getData = () => {
        if (todos.data) {
            let servicoFinalizados: AreaChartServiceGain[] = [];

            let servicosTop10: AreaChartServiceDone[] = [];
            let servicesAll: Service[] = [];

            todos.data.filter((item: Todo) =>
                item.status != TodoStatusEnum.pendente &&
                new Date(item.date).getFullYear() == new Date(Date.now()).getFullYear()
            ).map((item: Todo) => {

                // CARGA CHART SERVICO FINALIZADO
                if (item.status == TodoStatusEnum.finalizado) {
                    const month = mountsPt[new Date(item.date).getMonth()];
                    const indexData = servicoFinalizados.findIndex(x => x.month === mountsPt[new Date(item.date).getMonth()])

                    if (indexData === -1) {
                        servicoFinalizados.push({ month: month, valor: item.valorTotal });
                    } else {
                        servicoFinalizados[indexData].valor += item.valorTotal;
                    }
                }

                item.services.forEach(service => {
                    servicesAll.push(service)
                })

            });


            // CARGA CHART SERVICO TOP 10
            servicesAll.forEach(service => {
                const indexService = servicosTop10.findIndex(x => x.service == service.service);
                if (indexService === -1) {
                    servicosTop10.push({ service: service.service, quantidade: 1 });
                } else {
                    servicosTop10[indexService].quantidade += 1;
                }
            })

            servicosTop10 = servicosTop10.sort((a, b) => { // order asc
                return ('' + b.service).localeCompare(a.service);
            })
            servicosTop10 = servicosTop10.slice(0, 10);

            setChartServiceFinalizado({
                labels: servicoFinalizados.map(item => item.month),
                datasets: [
                    {
                        label: 'Total R$',
                        data: servicoFinalizados.map(item => item.valor),
                        backgroundColor: backgroundColor,
                        borderColor: borderColor,
                        borderWidth: 2,
                    }
                ]
            });

            setChartServiceTop10({
                labels: servicosTop10.slice(0, 10).map(item => item.service),
                datasets: [
                    {
                        label: 'Quantidade',
                        data: servicosTop10.slice(0, 10).map(item => item.quantidade),
                        backgroundColor: backgroundColor,
                        borderColor: borderColor,
                        borderWidth: 2,
                    }
                ]
            });
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <div style={cssDivChartDefault} className="uk-margin">
                <div style={{ width: '900px' }} className="uk-margin uk-margin-large-bottom">
                    <h3 style={cssTitleChart}>{`Gráfico faturamento mensal(${new Date().getUTCFullYear()})`}</h3>
                    <Bar
                        style={chartServiceFinalizado && chartServiceFinalizado.labels.length > 0 ? {} : { display: 'none' }}
                        itemID="barChart1"
                        ref={ref}
                        type="bar"
                        data={chartServiceFinalizado}
                        options={optionsChart}
                    />
                    <h5 className="uk-text-danger" style={chartServiceFinalizado && chartServiceFinalizado.labels.length == 0 ? {} : { display: 'none' }}>{semDadosMensagem}</h5>
                </div>
            </div>
            <div style={cssDivChartDefault} className="uk-margin">
                <div style={{ width: '900px' }} className="uk-margin uk-margin-large-bottom">
                    <h3 style={cssTitleChart}>{`Gráfico top 10 serviços realizados (ano atual - ${new Date().getUTCFullYear()})`}</h3>
                    <Bar
                        style={chartServiceTop10 && chartServiceTop10.labels.length > 0 ? {} : { display: 'none' }}
                        itemID="barChart2"
                        ref={ref}
                        type="bar"
                        data={chartServiceTop10}
                        options={optionsChart}
                    />
                    <h5 className="uk-text-danger" style={chartServiceTop10 && chartServiceTop10.labels.length == 0 ? {} : { display: 'none' }}>{semDadosMensagem}</h5>
                </div>
            </div>
        </>
    )
}

export default Home

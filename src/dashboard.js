import React from 'react';

import Header from './header';
import MainNav from './mainnav';


class Dashboard extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <Header />

        <MainNav />

        {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper">
          <section className="content-header">
            <h1>
              Dashboard
            </h1>
            <ol className="breadcrumb">
              <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
              <li><a href="#">Examples</a></li>
              <li className="active">Pace page</li>
            </ol>
          </section>

          <section className="content">

            <div className="box">
              <div className="box-header with-border">
                <h3 className="box-title">Title</h3>

                <div className="box-tools pull-right">
                  <button type="button" className="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip"
                          title="Collapse">
                    <i className="fa fa-minus"></i></button>
                  <button type="button" className="btn btn-box-tool" data-widget="remove" data-toggle="tooltip" title="Remove">
                    <i className="fa fa-times"></i></button>
                </div>
              </div>
              <div className="box-body">
                <br/>
                <div className="row">
                  <div className="col-xs-12 text-center">
                    <button type="button" className="btn btn-default btn-lrg ajax" title="Ajax Request">
                      <i className="fa fa-spin fa-refresh"></i>&nbsp; Get External Content
                    </button>
                  </div>
                </div>
                <div className="ajax-content">
                </div>
              </div>
              <div className="box-footer">
                Footer
              </div>
            </div>

          </section>
        </div>

      </div>
    );
  }
}

export default Dashboard

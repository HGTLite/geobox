import '../style/search-page.scss'

import React from 'react';
import {extend} from 'lodash';
import {
    SearchkitManager, SearchkitProvider,
    SearchBox, RefinementListFilter, Pagination,
    HierarchicalMenuFilter, HitsStats, SortingSelector, NoHits,
    ResetFilters, RangeFilter, NumericRefinementListFilter,
    ViewSwitcherHits, ViewSwitcherToggle, DynamicRangeFilter,
    InputFilter, GroupedSelectedFilters,
    Layout, TopBar, LayoutBody, LayoutResults,
    ActionBar, ActionBarRow, SideBar,TermQuery,BoolShould,FilteredQuery
} from 'searchkit'

import BASE_URL from '../script/BaseUrl';

// const host = "http://demo.searchkit.co/api/movies"
const esIndexName='geoboxes';
const host = BASE_URL.esServer+'/'+esIndexName;
const searchkit = new SearchkitManager(host)
// searchkit.addDefaultQuery((query)=> {
//    return query.addQuery(FilteredQuery({
//      filter:null
//    }))
//  })

const FileHitsGridItem = (props) => {
    const {bemBlocks, result} = props
    // let url = "http://www.imdb.com/title/" + result._source.imdbId
    let url = ""
    // console.log('查询后的返回结果',result._source)
    const source: any = extend({}, result._source, result.highlight)
    return (
        <div className={bemBlocks.item().mix(bemBlocks.container("item"))} data-qa="hit" width="640" height="320">
            <a href={url} target="_blank">
                <div data-qa="poster" alt="presentation" className={bemBlocks.item("poster")}
                     width="170" height="240">
                     <i className="fa fa-file-text-o fa-4x fa-blue opacity75"></i>

                 </div>

                <div data-qa="title" className={bemBlocks.item("title")}
                     dangerouslySetInnerHTML={{__html: source.file_display_name}}>
                </div>
            </a>
        </div>
    )
}

const FileHitsListItem = (props) => {
    const {bemBlocks, result} = props
    // let url = "http://www.imdb.com/title/" + result._source.imdbId
    let url = ""
    const source: any = extend({}, result._source, result.highlight)
    return (
        <div className={bemBlocks.item().mix(bemBlocks.container("item"))} data-qa="hit">
            <div className={bemBlocks.item("poster")}>
                <div  data-qa="poster" >
                     <i className="fa fa-file-text-o fa-3x fa-blue opacity75"></i>
                </div>
            </div>

            <div className={bemBlocks.item("details")}>
                <a href={url} target="_blank"><h2 className={bemBlocks.item("title")}
                                                  dangerouslySetInnerHTML={{__html: source.file_display_name}}></h2></a>
            </div>
        </div>
    )
}

class SearchkitPage extends React.Component {
    render() {
        return (
            <SearchkitProvider searchkit={searchkit}>
                <Layout>
                    <TopBar>
                        <div className="my-logo rgb-white-pure"></div>
                        <SearchBox autofocus={true} searchOnChange={true} placeholder='输入文件名'
                                   prefixQueryFields={["file_display_name^10", "file_suffix^2", "file_real_name"]}/>
                    </TopBar>

                    <LayoutBody>

                        <SideBar>
                            <RefinementListFilter id="fileType" title="文件分类" field="file_suffix" size={5}/>

                                <RangeFilter min={0} max={50} field="raster.img_resolution" id="resolution" title="分辨率"
                                                        showHistogram={true}/>

                                <NumericRefinementListFilter id="fileSize" title="文件大小" field="file_size"
                                     options={[
                                         {title: "所有"},
                                         {title: "0 - 10M", from: 0, to: 10485760},
                                         {title: "10M - 128M", from: 10485760, to: 134217728},
                                         {title: "128M - 1G", from: 134217728, to: 1073741824},
                                         {title: "1G - ...", from: 1073741824, to: 4400000000000}
                                     ]}/>
                        </SideBar>

                        <LayoutResults>
                            <ActionBar>
                                <ActionBarRow>
                                    <HitsStats translations={{
                                        "hitstats.results_found": "共找到 {hitCount} 个文件"
                                    }}/>
                                    <ViewSwitcherToggle/>
                                    <SortingSelector options={[
                                        {label: "相关度优先", field: "_score", order: "desc"},
                                        {label: "最新优先", field: "file_date.upload_date", order: "desc"},
                                        {label: "最早优先", field: "file_date.upload_date", order: "asc"}
                                    ]}/>
                                </ActionBarRow>

                                <ActionBarRow>
                                    <GroupedSelectedFilters/>
                                    <ResetFilters/>
                                </ActionBarRow>

                            </ActionBar>

                            <ViewSwitcherHits
                                hitsPerPage={16} highlightFields={["title", "plot"]}
                                sourceFilter={["file_id","file_display_name","file_size","file_suffix","file_date","raster","file_tag","is_deleted"]}
                                hitComponents={[
                                    {key: "grid", title: "小图", itemComponent: FileHitsGridItem, defaultOption: true},
                                    {key: "list", title: "列表", itemComponent: FileHitsListItem}
                                ]}
                                scrollTo="body"
                            />
                            <NoHits suggestionsField={"title"}/>
                            <Pagination showNumbers={true}/>
                        </LayoutResults>

                    </LayoutBody>
                </Layout>
            </SearchkitProvider>
        );
    }
}

export default SearchkitPage;

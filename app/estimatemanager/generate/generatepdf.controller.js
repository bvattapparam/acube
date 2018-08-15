(function(){

	function generateESTPDFController($location, $window, $routeParams, $scope, $rootScope, $modalInstance, passingValues, $filter, settings, utilityServices, storageServices, getreferences,$http, mainServices){

        $scope.passingvalues        =   passingValues
        $scope.PDFBO				=	passingValues.PDFBO;
        $scope.estimateManagerBO    =   passingValues.estMaster;
        $scope.dataBO               =   {};
        console.log('PDFBO',  $scope.PDFBO)

        $scope.reference						=	{};
		$scope.referenceData					=	{};
		$scope.referenceData.referencesDataMap 	= {
			"CUSTOMERTYPE" 	:	getreferences.referencesData.CUSTOMERTYPE,
			"LOCATION"		:	getreferences.referencesData.LOCATION
		};

		$scope.reference = 	getreferences.references;
        $scope.cancel = function (frm) {
			var title 		= 	Messages["edit.form.confirmation.title"];
			var message 	=	Messages["edit.form.confirmation.body"];
			utilityServices.closeModel($modalInstance,frm,title,message);
        };
        

        // GROUP THE PDFBO...
        var src = $scope.PDFBO.dataBO;
        var grouped = src.reduce(function(acc, item){
            var key = item.LOCATION;
            acc[key] = acc[key] || [];
            acc[key].push(item);
            return acc;
        },{});
        var output = [];
        output.push([ 
            {
                text: Messages['label.description'].toUpperCase(),
                style: 'itemsHeader'
            }, 
            {
                text: Messages['label.quantity'].toUpperCase(),
                style: [ 'itemsHeader', 'center']
            }, 
            {
                text: Messages['label.units'].toUpperCase(),
                style: [ 'itemsHeader', 'center']
            }, 
            {
                text: Messages['label.percost'].toUpperCase(),
                style: [ 'itemsHeader', 'center']
            }, 
            {
                text: Messages['label.amount'].toUpperCase(),
                style: [ 'itemsHeader', 'center']
            }
        ]);
            
            for(var key in grouped){
                output.push([{text:$scope.referenceData.referencesDataMap.LOCATION[key], style: 'tableHeaderone', colSpan: 5, alignment: 'left'}]);
                if(grouped.hasOwnProperty(key)){
                    var val = grouped[key];
                    for(const s of val){
                        output.push([{text:s.DESCRIPTION},{text:s.QTY},{text:s.UNIT},{text:$filter('aswaCurrency')(s.PERCOST), alignment: 'right'},{text:$filter('aswaCurrency')(s.AMOUNT), alignment: 'right'}])
                    }
                }
            }
            output.push([{text:'Sub Total', style:'subTotal'},{text:$scope.PDFBO.TOTALQTY,style:'subTotal'},{text:'', style:'subTotal'},{text:'',style:'subTotal'},{text:$filter('aswaCurrency')($scope.PDFBO.TOTALAMOUNT), style:'subTotal', alignment: 'right'}])

        $scope.body= angular.copy(output);
        $scope.emptySpace = "";
        // CODE TO GENERATE PDF.
      
        $scope.generatePDF = function(data, frm){
            $scope.EXPIRYDATE = data.EXPIRYDATE;
            $scope.SPECIALNOTE = data.COMMENT;
            if(typeof $scope.SPECIALNOTE == 'undefined' || $scope.SPECIALNOTE == ''){
                $scope.special_note = '';
            }else{
                $scope.special_note =  {   
                    stack: [
                        {text: 'Comments & Special Instruction :', style: 'specialNoteTitle'},
                        {text: $scope.SPECIALNOTE, style: 'specialNote'},
                    ],
                };
            };
            var docDefinition = {
                pageMargins: [ 10, 30, 10, 52 ],
                pageSize: 'A4',
                
                header: [{
                    table: {
                        widths: [150, '*'],
                        body: [
                            [{text: 's', fillColor:'#FF4500', color:'#FF4500', alignment: 'left'},{text: '', fillColor: '#333333',fontSize: 7,  alignment: 'left'}]
                        ]
                    },
                    layout: 'noBorders'
                }],
                    footer: function (currentPage, pageCount) {
                        return {
                            /*table: {
                                widths: ['*','*'],
                                margin: [10, 10, 10, 10],
                                body: [
                                    [
                                        // [left, top, right, bottom]
                                        { text: "Page " + currentPage.toString() + ' of ' + pageCount, alignment: 'right', fontSize:7, style: 'normalText', colSpan: 2 }
                                    ]
                                ]
                            },*/
                            table: {
                                widths: [150, '*'],
                                body: [
                                    [{text: 'A Unit of MEENUMIX group of companies', alignment: 'center', colSpan:  2, fontSize: 7}],
                                    [{text: 'Registered Office: 248/2-A, Hanuman Colony, Injambakkam, Chennai - 600 115, Tamilnadu, India', fontSize: 7, alignment: 'center', colSpan:  2}],
                                    [{text: 'BENGALURU | CHENNAI | COIMBATORE | DUBAI | LONDON', alignment: 'center', colSpan:  2, fontSize: 7}],
                                    [{text: 's', fillColor:'#FF4500', color:'#FF4500', alignment: 'left'},{text: '', fillColor: '#333333',fontSize: 7,  alignment: 'left'}]
                                ]
                            },
                            layout: 'noBorders'
                        };
                    },
                content: [
                    // Header
                    {
                        columns: [
                            {
                               image: 'data:image/png;base64,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',
                               style: 'invoiceLogo',
                               width:75
                            },  
                            [
                                {
                                    text: 'ESTIMATE', 
                                    style: 'invoiceTitle',
                                    width: '*'
                                },
                                {
                                  stack: [
                                    {
                                        columns: 
                                        [
                                            {
                                                lineHeight: 1.3,
                                                text:'ESTIMATE ID : ', 
                                                style:'invoiceSubTitle',
                                                width: '*'
                                                
                                            },
                                            {
                                                text:($scope.estimateManagerBO[0].ESTIMATEID) || '-', 
                                                style:'invoiceSubValue',
                                                width: 180
                                                
                                            }
                                        ]
                                    },
                                    {
                                        columns: 
                                        [
                                            {
                                                lineHeight: 1.3,
                                                text:'CUSTOMER ID : ', 
                                                style:'invoiceSubTitle',
                                                width: '*'
                                                
                                            },
                                            {
                                                text:($scope.estimateManagerBO[0].CUSTOMERID) || '-', 
                                                style:'invoiceSubValue',
                                                width: 180
                                                
                                            }
                                        ]
                                    }, 
                                    {
                                        columns: 
                                        [
                                            {
                                                lineHeight: 1.3,
                                                text:'CUSTOMERNAME : ', 
                                                style:'invoiceSubTitle',
                                                width: '*'
                                                
                                            },
                                            {
                                                text:($scope.estimateManagerBO[0].FULLNAME) || '-', 
                                                style:'invoiceSubValue',
                                                width: 180
                                                
                                            }
                                        ]
                                    }, 
                                    {
                                        columns: 
                                        [
                                            {
                                                lineHeight: 1.3,
                                                text:'CREATED DATE : ', 
                                                style:'invoiceSubTitle',
                                                width: '*'
                                                
                                            },
                                            {
                                                text:($filter('aswaDate')($scope.estimateManagerBO[0].CREATEDDATE)) || '-', 
                                                style:'invoiceSubValue',
                                                width: 180
                                                
                                            }
                                        ]
                                    },
                                    {
                                        columns: 
                                        [
                                            {
                                                lineHeight: 1.3,
                                                text:'EXPIRY DATE : ', 
                                                style:'invoiceSubTitle',
                                                width: '*'
                                                
                                            },
                                            {
                                                text:($filter('aswaDate')($scope.EXPIRYDATE)) || '-', 
                                                style:'invoiceSubValue',
                                                width: 180
                                                
                                            }
                                        ]
                                    },
                                    {
                                        columns: 
                                        [
                                            {
                                                text:'PREPARED BY : ', 
                                                style:'invoiceSubTitle',
                                                width: '*'
                                                
                                            },
                                            {
                                                text:($rootScope.user.FULLNAME) || '-', 
                                                style:'invoiceSubValue',
                                                width: 180
                                                
                                            }
                                        ]
                                    }, 
                                   ]
                                }
                            ],
                        ],
                    },
                    // Billing Headers
                    {
                        columns: [
                            {
                                text: 'Customer Address: ',
                                style:'invoiceAddressTitle',
                                
                            }
                        ],
                        
                    },
                    // Billing Details
                    {
                        columns: [
                            {
                                text: ($scope.estimateManagerBO[0].ADDRESS) || '-',
                                style: 'invoiceAddress'
                            }
                        ],
                       
                    },
                    $scope.special_note,
                    { 
                        stack: [
                            {text: $scope.emptySpace, style: 'emptySpace'},
                        ],
                    },
                    {
                      table: {
                        headerRows: 1,
                        widths: [ '*', 'auto', 'auto', 'auto', 'auto' ],
                        body:$scope.body
                      }, 
                     
                    //  layout: 'lightHorizontalLines'
                    },
                    { 
                        text: 'NOTES',
                        style:'notesTitle'
                    },
                    {
                        ul: [
                            'Tax as applicable',
                            'Actual Measurement in Feet System',
                            'Plywood Brand: Sharon Ply / Greenply Gold / Equivalent',
                            'Plywood Type : Boiled Water Proof (BWP 710)',
                            'Laminate : Greenlam/ Merinolam/ Century Laminates/ Equivalent',
                            'Civil,Electrical and PLumbing works on actuals',
                            'Hinges : Ebbco/Hetitch/Sleek'
                        ]
                    },
                ],
                styles: {
                    tbl:{
                        fontSize:8
                    },
                    subTotal:{
                        bold:true,
                        fillColor:'#f2b94f',
                        fontSize: 10
                    },
                    specialNote:{
                        fontSize:9,
                        alignment:'left'
                    },
                    specialNoteTitle:{
                        fontSize:9,
                        bold:true,
                        alignment:'left',
                        margin:[0,0,0,0]
                    },
                    emptySpace:{
                        margin:[0,0,10,10]
                    },
                    tableHeaderone:{
                        fillColor:'#f6e0b8',
                        bold: false
                    },
                    lineSpacing: {  
                        margin: [0, 0, 0, 6]  
                    },
                     invoiceLogo: {
                         margin:[0,0,0,5],
                         alignment: 'left'
                     },
                     // Invoice Title
                     invoiceTitle: {
                         fontSize: 20,
                         bolditalics: true,
                         alignment:'right',
                         margin:[0,0,0,15]
                     },
                     // Invoice Details
                     invoiceSubTitle: {
                        fontSize: 9,
                        bold: true,
                        alignment:'right'
                     },
                     invoiceSubValue: {
                         fontSize: 9,
                         bold: false,
                         alignment:'right'
                     },
                     invoiceAddressTitle:{
                        fontSize: 9,
                         bold: true,
                         alignment:'left',
                        // margin:[0,20,0,5],
                         margin:[0,-70,10,10],
                     },
                     invoiceAddress:{
                        fontSize: 9,
                         bold: false,
                         alignment:'left',
                         margin:[0,-55,50,50],
                     },
                     // Billing Headers
                     invoiceBillingTitle: {
                         fontSize: 14,
                         bold: true,
                         alignment:'left',
                         margin:[0,20,0,5],
                     },
                     // Billing Details
                     invoiceBillingDetails: {
                         alignment:'left'
             
                     },
                     invoiceBillingAddressTitle: {
                         margin: [0,7,0,3],
                         bold: true
                     },
                     // Items Header
                     itemsHeader: {
                        fillColor:'#f2b94f',
                         fontSize:9,
                         margin: [0,5,0,5],
                         bold: true
                     },
                     // Item Title
                     itemTitle: {
                         bold: true,
                     },
                     itemSubTitle: {
                         italics: true,
                         fontSize: 11
                     },
                     itemNumber: {
                         margin: [0,5,0,5],
                         alignment: 'center',
                     },
                     itemTotal: {
                         margin: [0,5,0,5],
                         bold: true,
                         alignment: 'center',
                     },
             
                     // Items Footer (Subtotal, Total, Tax, etc)
                     itemsFooterSubTitle: {
                         margin: [0,5,0,5],
                         bold: true,
                         alignment:'right',
                     },
                     itemsFooterSubValue: {
                         margin: [0,5,0,5],
                         bold: true,
                         alignment:'center',
                     },
                     itemsFooterTotalTitle: {
                         margin: [0,5,0,5],
                         bold: true,
                         alignment:'right',
                     },
                     itemsFooterTotalValue: {
                         margin: [0,5,0,5],
                         bold: true,
                         alignment:'center',
                     },
                     signaturePlaceholder: {
                         margin: [0,70,0,0],   
                     },
                     signatureName: {
                         bold: true,
                         alignment:'center',
                     },
                     signatureJobTitle: {
                         italics: true,
                         fontSize: 10,
                         alignment:'center',
                     },
                     notesTitle: {
                       fontSize: 10,
                       bold: true,  
                       margin: [0,50,0,3],
                     },
                     notesText: {
                       fontSize: 10
                     },
                     center: {
                         alignment:'center',
                     },
                 },
                 defaultStyle: {
                     columnGap: 0,
                     fontSize:9
                 }
            }
            //pdfMake.createPdf(docDefinition).open();
           pdfMake.createPdf(docDefinition).download('EST_' + $scope.estimateManagerBO[0].CUSTOMERID);
           //pdfMake.createPdf(docDefinition).print();
           $scope.cancel(frm);
			
        }
	}

	angular.module('aswa').controller('generateESTPDFController',['$location', '$window', '$routeParams', '$scope', '$rootScope', '$modalInstance', 'passingValues','$filter', 'settings', 'utilityServices', 'storageServices', 'getreferences', '$http', 'mainServices', generateESTPDFController]);
})();

(function(){

	function generateQTPDFController($location, $window, $routeParams, $scope, $rootScope, $modalInstance, passingValues, $filter, settings, utilityServices, storageServices, pdfServices, getreferences,$http, mainServices){

        $scope.passingvalues        =   passingValues
        $scope.PDFBO				=	passingValues.PDFBO;
        $scope.quoteManagerBO       =   passingValues.quoteMaster;
        $scope.dataBO               =   {};
        console.log('PDFBO',  $scope.PDFBO)
        $scope.dataBO.THANKNOTEFOOTER = Messages['pdffootet.thanknote.default'];

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
                text: Messages['label.sno'].toUpperCase(),
                style: 'itemsHeader'
            }, 
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
        var sno_main = 1;
        var sno = 1;
            for(var key in grouped){
                output.push([{text: "(" + $filter('character')(sno_main) + ") " , style: 'tableHeaderone', alignment: 'left'},{text: $scope.referenceData.referencesDataMap.LOCATION[key], style: 'tableHeaderone', colSpan: 5, alignment: 'left'}]);
                
                if(grouped.hasOwnProperty(key)){
                    var val = grouped[key];
                    for(const s of val){
                        output.push([{text:sno, style:'cellText', alignment:'right'},{text:s.DESCRIPTION, style:'cellText'},{text:s.QTY},{text:s.UNIT},{text:$filter('aswaCurrency')(s.PERCOST), alignment: 'right'},{text:$filter('aswaCurrency')(s.AMOUNT), alignment: 'right'}])
                        sno = sno+1;
                    }
                   
                }
                sno_main = sno_main + 1;
            }
            output.push([{text:'Sub Total', style:'subTotal',colSpan: 2},{text:$scope.PDFBO.TOTALQTY,style:'subTotal'},{text:'', style:'subTotal'},{text:'',style:'subTotal'},{text:'',style:'subTotal'},{text:$filter('aswaCurrency')($scope.PDFBO.TOTALAMOUNT), style:'subTotal', alignment: 'right'}])
            if($scope.PDFBO.DISCOUNT){
                output.push([{text:'Discount', style:'subTotal',colSpan: 5},{text:'',style:'subTotal'},{text:'', style:'subTotal'},{text:'',style:'subTotal'},{text:'',style:'subTotal'},{text:$filter('aswaCurrency')($scope.PDFBO.DISCOUNT), style:'subTotal', alignment: 'right'}])
                output.push([{text:'Net Amount', style:'subTotal',colSpan: 5},{text:'',style:'subTotal'},{text:'', style:'subTotal'},{text:'',style:'subTotal'},{text:'',style:'subTotal'},{text:$filter('aswaCurrency')($scope.PDFBO.NETAMOUNT), style:'subTotal', alignment: 'right'}])
            }
        $scope.body= angular.copy(output);
        $scope.emptySpace = "";
        // CODE TO GENERATE PDF.
      
        $scope.generatePDF = function(data, frm){
            $scope.EXPIRYDATE = data.EXPIRYDATE;
            $scope.SPECIALNOTE = data.COMMENT;
            $scope.SPECIALNOTEFOOTER = data.COMMENTFOOTER;
            $scope.THANKNOTEFOOTER = data.THANKNOTEFOOTER;
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
            if(typeof $scope.SPECIALNOTEFOOTER == 'undefined' || $scope.SPECIALNOTEFOOTER == ''){
                $scope.special_note_footer = '';
            }else{
                $scope.special_note_footer =  {   
                    stack: [
                        {text: 'Special Note :', style: 'specialNoteTitle'},
                        {text: $scope.SPECIALNOTEFOOTER, style: 'specialNote'},
                    ],
                };
            };
            if(typeof $scope.THANKNOTEFOOTER == 'undefined' || $scope.THANKNOTEFOOTER == ''){
                $scope.thank_note_footer = '';
            }else{
                $scope.thank_note_footer =  {   
                    stack: [
                        {text: $scope.THANKNOTEFOOTER, style: 'specialNote'},
                    ],
                };
            };
            var docDefinition = {
                pageMargins: [ 20, 115, 20, 130 ],
                pageSize: 'A4',
                
                header: function(currentPage, pageCount, pageSize) {
                    return [
                        { image: pdfServices.pdfHeader, width: 595 }
                    ]
                },
                footer: function(currentPage, pageCount, pageSize) {
                    return [
                        {
                            table: {
                                headerRows: 1,
                                body: [
                                    [{text: 's', color: '#ffffff', margin: [0,55,0,0]}],
                                ]
                            },
                            layout: 'noBorders'
                        },,
                        { image: pdfServices.pdfFooter, width: 600}
                    ]
                },   
                content: [
                    // Header
                    {
                        columns: [
                            {
                               //width:75
                            },  
                            [
                                {
                                    text: 'QUOTATION', 
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
                                                text:'QUOTE ID : ', 
                                                style:'invoiceSubTitle',
                                                width: '*'
                                                
                                            },
                                            {
                                                text:($scope.quoteManagerBO[0].QUOTEID) || '-', 
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
                                                text:($scope.quoteManagerBO[0].CUSTOMERID) || '-', 
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
                                                text:($scope.quoteManagerBO[0].FULLNAME) || '-', 
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
                                                text:($filter('aswaDate')($scope.quoteManagerBO[0].CREATEDDATE)) || '-', 
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
                                text: 'CUSTOMER ADDRESS: ',
                                style:'invoiceAddressTitle',
                                uppercase: true
                                
                            }
                        ],
                        
                    },
                    // Billing Details
                    {
                        columns: [
                            {
                                text: ($scope.quoteManagerBO[0].ADDRESS) || '-',
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
                        widths: [ 20,'*', 'auto', 'auto', 'auto', 'auto' ],
                        body:$scope.body
                      }, 
                     
                     //layout: 'lightHorizontalLines'
                    
                    },
                    $scope.special_note_footer,
                    { 
                        stack: [
                            {text: $scope.emptySpace, style: 'emptySpace'},
                        ],
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
                    { 
                        stack: [
                            {text: $scope.emptySpace, style: 'emptySpace'},
                        ],
                    },
                    $scope.thank_note_footer,
                ],
                styles: {
                    cellText:{
                        lineHeight:1.2,
                        margin:[0,5,0,5]
                    },
                    tbl:{
                        fontSize:8
                    },
                    subTotal:{
                        bold:true,
                        fillColor:'#D7D7D8',
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
                        margin:[0,20,0,0],
                        lineGap:20
                    },
                    emptySpace:{
                        margin:[0,0,10,10]
                    },
                    tableHeaderone:{
                        fillColor:'#D7D7D8',
                        bold: false,
                        color: '#000000'
                    },
                    lineSpacing: {  
                        margin: [0, 2, 0, 6]  
                    },
                     invoiceLogo: {
                         margin:[0,0,0,5],
                         alignment: 'left'
                     },
                     // Invoice Title
                     invoiceTitle: {
                         fontSize: 15,
                         bold: true,
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
                         margin:[0,-90,10,10],
                     },
                     invoiceAddress:{
                        fontSize: 9,
                         bold: false,
                         alignment:'left',
                         margin:[0,-75,50,50],
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
                        fillColor:'#797B7E',
                        color: '#ffffff',
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
           // pdfMake.createPdf(docDefinition).open();
           pdfMake.createPdf(docDefinition).download('QUOTE_' + $scope.quoteManagerBO[0].CUSTOMERID);
           //pdfMake.createPdf(docDefinition).print();
           $scope.cancel(frm);
			
        }
	}

	angular.module('aswa').controller('generateQTPDFController',['$location', '$window', '$routeParams', '$scope', '$rootScope', '$modalInstance', 'passingValues','$filter', 'settings', 'utilityServices', 'storageServices', 'pdfServices', 'getreferences', '$http', 'mainServices', generateQTPDFController]);
})();


-- Values for tbl_ref_car_module type
DELETE from TBL_REF_CAR_MODULE_TYPE;

INSERT INTO TBL_REF_CAR_MODULE_TYPE(CODE,NAME,STATUS) VALUES('CM1','Fuel',1);
INSERT INTO TBL_REF_CAR_MODULE_TYPE(CODE,NAME,STATUS) VALUES('CM2','Service',1);
INSERT INTO TBL_REF_CAR_MODULE_TYPE(CODE,NAME,STATUS) VALUES('CM3','Other',1);
INSERT INTO TBL_REF_CAR_MODULE_TYPE(CODE,NAME,STATUS) VALUES('CM4','Insurance',1);

-- Values for tbl_ref_car_module type
DELETE from TBL_REF_CAR_MODEL;

INSERT INTO TBL_REF_CAR_MODEL(CODE,NAME,STATUS) VALUES('C1','MARUTI BALENO CVT',1);
INSERT INTO TBL_REF_CAR_MODEL(CODE,NAME,STATUS) VALUES('C2','MARUTI ALTO AMT',1);

-- Values for tbl_ref_insurance_name type
DELETE from TBL_REF_INSURANCE_NAME;

INSERT INTO TBL_REF_INSURANCE_NAME(CODE,NAME,STATUS) VALUES('IN1','LIC JEEVAN ANAND',1);
INSERT INTO TBL_REF_INSURANCE_NAME(CODE,NAME,STATUS) VALUES('IN2','LIC JEEVAN SHAGUN',1);
INSERT INTO TBL_REF_INSURANCE_NAME(CODE,NAME,STATUS) VALUES('IN3','HDFC ERGO GENERAL INSURANCE',1);
INSERT INTO TBL_REF_INSURANCE_NAME(CODE,NAME,STATUS) VALUES('IN4','ROYAL SUNDARAM INSURANCE',1);

DELETE from TBL_REF_INSURANCE_TYPE;

INSERT INTO TBL_REF_INSURANCE_TYPE(CODE,NAME,STATUS) VALUES('IT1','PERSONAL INSURANCE',1);
INSERT INTO TBL_REF_INSURANCE_TYPE(CODE,NAME,STATUS) VALUES('IT2','HOME INSURANCE',1);
INSERT INTO TBL_REF_INSURANCE_TYPE(CODE,NAME,STATUS) VALUES('IT3','VEHILE INSURANCE',1);





-- VIEWS ----------

CREATE VIEW VIEW_REF_INSURANCE_NAME AS SELECT * FROM TBL_REF_INSURANCE_NAME;
CREATE VIEW VIEW_REF_INSURANCE_TYPE AS SELECT * FROM TBL_REF_INSURANCE_TYPE;

DROP VIEW VIEW_INSURANCE_MASTER;
CREATE VIEW VIEW_INSURANCE_MASTER AS SELECT * FROM TBL_INSURANCE_MASTER;

DROP VIEW VIEW_REF_AVATAR;
CREATE VIEW VIEW_REF_AVATAR AS SELECT * FROM TBL_REF_AVATAR;

DROP VIEW VIEW_CUSTOMER_MASTER;
CREATE VIEW VIEW_CUSTOMER_MASTER AS SELECT * FROM TBL_CUSTOMER_MASTER;



DROP VIEW VIEW_GRAND_TOTAL;
CREATE VIEW VIEW_GRAND_TOTAL AS SELECT (SELECT SUM(rent_amount) FROM tbl_rent) AS rentTotal, 
(SELECT SUM(amount) FROM tbl_medicalbill) AS MEDICAL_BILL_TOTAL, 
(SELECT SUM(amount_paid) FROM tbl_gas) AS GAS_BILL_TOTAL, 
(SELECT SUM(sub_amount) FROM tbl_gas) as GAS_SUB_TOTAL, 
(SELECT SUM(amount) FROM tbl_mobile) as MOBILE_BILL_TOTAL, 
(SELECT SUM(travel_amount) FROM tbl_travel) as TRAVEL_TOTAL, 
(SELECT SUM(AMOUNT) FROM VIEW_FLATBASICPAYMENT) as FLATBASIC_PAYMENT_TOTAL, 
(SELECT SUM(PREMIUM) FROM VIEW_INSURANCE_MASTER) as INSURANCE_POLICY_TOTAL,
(SELECT SUM(AMOUNT) FROM VIEW_CAR_FUEL) as CAR_FUEL_TOTAL, 
(SELECT SUM(AMOUNT) FROM VIEW_CAR_SERVICE) as CAR_SERVICE_TOTAL, 
(SELECT SUM(AMOUNT) FROM VIEW_SCHOOL_FEES) as SCHOOL_FEES_TOTAL, 
(SELECT SUM(AMOUNT) FROM VIEW_BROADBAND) as BROADBAND_TOTAL, 
(SELECT SUM(AMOUNT) FROM VIEW_CAR_OTHERS) as CAR_OTHERS_TOTAL;



CREATE VIEW VIEW_AUTHENTICATION AS SELECT * FROM tbl_authentication
CREATE VIEW VIEW_JURISDICTION AS SELECT * FROM TBL_JURISDICTION

CREATE VIEW VIEW_REF_CUSTOMER_TYPE AS SELECT * FROM TBL_REF_CUSTOMER_TYPE;


DROP VIEW VIEW_ESTIMATE_MASTER;
CREATE VIEW VIEW_ESTIMATE_MASTER AS SELECT * FROM TBL_ESTIMATE_MASTER;

------ REFERENCES ------

CREATE VIEW VIEW_REF_CUSTOMERSTATUS AS SELECT * FROM TBL_REF_CUSTOMERSTATUS;
CREATE VIEW VIEW_REF_PAYMENTMODE AS SELECT * FROM TB_REF_PAYMENTMODE;
CREATE VIEW VIEW_REF_JURISDICTION AS SELECT * FROM TB_REF_JURISDICTION;


#import org.apache.log4j.Logger
#import org.apache.log4j.Level

#Logger.getLogger("org").setLevel(Level.OFF)
#Logger.getLogger("akka").setLevel(Level.OFF)

#import py4j
#import pyspark
from pyspark.sql import SQLContext, Row
#from pyspark import SparkConf, SparkContext

sqlctx = SQLContext(sc)

from pyspark.sql import HiveContext

hsqlctx = HiveContext(sc)

import pyspark.sql.functions as F

#read schema from hive table
df_all_states_h = hsqlctx.sql("select * from all_states1 limit 1")

#reading from Parquet file
df_all_states = sqlctx.read.parquet('/user/psahadevan1/all_states')

##Rename columns of dataframe read from Parquet
for i in range(len(df_all_states_h.columns)):
    df_all_states = df_all_states.withColumnRenamed(df_all_states.columns[i],df_all_states_h.columns[i])
    
## Create age column from birth_dt and donation_dt

df_all_states = df_all_states.withColumn('age',F.round(F.datediff(df_all_states.donation_dt,df_all_states.birth_dt)/365))

##apply filter
df_all_states_2000_2016 = df_all_states.where((F.year(df_all_states.donation_dt) >=2000) & (F.year(df_all_states.donation_dt) <=2016) &(df_all_states.age>=0))

#group by age
df_all_states_2000_2016.groupby('age').agg({'arc_id':'count'}).sort('age').collect()
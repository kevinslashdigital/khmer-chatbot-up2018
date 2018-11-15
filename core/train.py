"""
    Chatbot class
"""

import sys, os
import argparse

from khmerml.machine_learning import MachineLearning
from khmerml.preprocessing.preprocessing_data import Preprocessing
from khmerml.utils.file_util import FileUtil
from khmerml.utils.bg_colors import Bgcolors

if __name__ == "__main__":

  config = {
    'text_dir': 'dataset',
    'dataset': 'data/matrix',
    'bag_of_words': 'data/bag_of_words',
    'train_model': 'data/model/doc.model',
    'is_unicode': False
  }

  ml = MachineLearning(**config)
  # choose your algorithm
  algo = ml.NiaveBayes()
  # algo = ml.DecisionTree(criterion='gini', prune='depth', max_depth=50, min_criterion=0.05)
  prepro = Preprocessing(**config)

  # preposessing
  dataset_matrix = prepro.loading_data(config['text_dir'], 'doc_freq', 'all', 1)
  #load dataset from file (feature data)
  filename = "doc_freq_1.csv"
  dataset_path = FileUtil.dataset_path(config, filename)
  dataset_sample = FileUtil.load_csv(dataset_path)
  # dataset_sample = prepro.normalize_dataset(dataset_sample)
  # print(dataset_sample)

  # split dataset -> train set, test set
  training_set, test_set = ml.split_dataset(dataset_sample, 1)
  # train
  model = algo.train(training_set)

  # make a prediction
  predictions = algo.predict(model, test_set)
  # Prediction accuracy
  acc = ml.accuracy(predictions, test_set)

  print('predictions, prediction_details', predictions, acc)
  print('label', ml.to_label(predictions,'data/bag_of_words/label_match.pickle'))
  print('==== Chatbot train completed! ====')

